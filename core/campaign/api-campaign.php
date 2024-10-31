<?php

namespace Poptics\Core\Campaign;

use Poptics\Base\Api;
use Poptics\Core\Analytics\Analytics;
use Poptics\Core\Emails\Campaign_Email;
use Poptics\Utils\Singleton;
use WP_HTTP_Response;

/**
 * Class API Campaign
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Api_Campaign extends Api {

    use Singleton;

    /**
     * Store namespace
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $namespace = 'poptics/v1';

    /**
     * Store rest base
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $rest_base = 'campaign';

    /**
     * Store rest base
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $data = [];

    /**
     * Store rest base
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $id = '';

    /**
     * Register rest routes.
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function register_routes() {
        /*
         * Register campaign routes
         */
        register_rest_route( $this->namespace, $this->rest_base, [
            [
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => [$this, 'create_item'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'get_items'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
            [
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => [$this, 'bulk_delete'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );

        /**
         * Register single campaign routes
         *
         * @var void
         */
        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<campaign_id>[\d]+)', [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'get_item'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
            [
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => [$this, 'update_item'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
            [
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => [$this, 'delete_item'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );

        /**
         * Register campaign filter route
         */
        register_rest_route( $this->namespace, $this->rest_base . '/search', [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'search_items'],
                'permission_callback' => function () {
                    return true;
                },
            ],
        ] );

        /**
         * Register campaign clone route
         */
        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<campaign_id>[\d]+)' . '/clone', [
            [
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => [$this, 'clone_item'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );

        /**
         * Register email test API
         */
        register_rest_route( $this->namespace, '/' . $this->rest_base . '/email/test', [
            [
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => [$this, 'test_email'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );
    }

    /**
     * Get all campaigns
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return  JSON
     */
    public function get_items( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $per_page = !empty( $request['per_page'] ) ? intval( $request['per_page'] ) : 20;
        $paged    = !empty( $request['paged'] ) ? intval( $request['paged'] ) : 1;

        $args = [
            'posts_per_page' => $per_page,
            'paged'          => $paged,
        ];

        $campaigns    = Campaign::all( $args );
        $items        = [];
        $status_count = Campaign::total_campaigns_group_by_status();

        foreach ( $campaigns['items'] as $item ) {
            $items[] = $this->prepare_item( $item->ID );
        }

        $types = Campaign::get_campaign_meta_value( '_pt_campaign_type' );
        $goals = Campaign::get_campaign_meta_value( '_pt_campaign_goal' );

        $data = [
            'status_code' => 200,
            'success'     => 1,
            'data'        => [
                'total'        => $campaigns['total'],
                'status_count' => $status_count,
                'types'        => $types,
                'goals'        => $goals,
                'items'        => $items,
            ],
        ];

        return rest_ensure_response( $data, 200 );
    }

    /**
     * Filter campaign
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     * @return  JSON  Filtered campaign data
     */
    public function search_items( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $per_page     = !empty( $request['per_page'] ) ? intval( $request['per_page'] ) : -1;
        $paged        = !empty( $request['paged'] ) ? intval( $request['paged'] ) : -1;
        $goal         = !empty( $request['goal'] ) ? sanitize_text_field( $request['goal'] ) : '';
        $type         = !empty( $request['type'] ) ? sanitize_text_field( $request['type'] ) : '';
        $status       = !empty( $request['status'] ) ? sanitize_text_field( $request['status'] ) : '';
        $search_key   = !empty( $request['search_key'] ) ? sanitize_text_field( $request['search_key'] ) : '';
        $campaign_ids = !empty( $request['campaign_ids'] ) ? array_map( 'intval', explode( ',', sanitize_text_field( $request['campaign_ids'] ) ) ) : [];

        $campaigns = Campaign::all( [
            'post__in'       => $campaign_ids,
            'posts_per_page' => $per_page,
            'paged'          => $paged,
            'goal'           => $goal,
            'type'           => $type,
            'post_status'    => $status,
            'search_key'     => $search_key,
        ] );

        $campaign_ids = array_column( $campaigns['items'], 'ID' );
        $match_case   = [
            'campaign_ids' => $campaign_ids,
        ];

        $analytics      = new Analytics();
        $analytics_data = $analytics->get_analytics_info_group_by_campaign( $match_case );

        $items = [];

        foreach ( $campaigns['items'] as $item ) {
            $index = array_search( $item->ID, array_column( $analytics_data, 'campaign_id' ) );

            $single_campaign = $this->prepare_item( $item->ID );
            if ( $index != '' && $index >= 0 ) {
                $single_campaign_analytics_details = $analytics_data[$index];
                $conversion_rate                   = 0;

                if ( $single_campaign_analytics_details->total_conversions > 0 && $single_campaign_analytics_details->total_views > 0 ) {
                    $conversion_rate = $single_campaign_analytics_details->total_conversions / $single_campaign_analytics_details->total_views * 100;
                }

                $single_campaign['analytics_details'] = [
                    'total_visitors'        => $single_campaign_analytics_details->total_visitors,
                    'total_views'           => $single_campaign_analytics_details->total_views,
                    'total_conversions'     => $single_campaign_analytics_details->total_conversions,
                    'total_conversion_rate' => $conversion_rate,
                ];
            } else {
                $single_campaign['analytics_details'] = [
                    'total_visitors'        => 0,
                    'total_views'           => 0,
                    'total_conversions'     => 0,
                    'total_conversion_rate' => 0,
                ];
            }

            $items[] = $single_campaign;
        }

        $status_count = Campaign::total_campaigns_group_by_status();
        $types        = Campaign::get_campaign_meta_value( '_pt_campaign_type' );
        $goals        = Campaign::get_campaign_meta_value( '_pt_campaign_goal' );

        $data = [
            'success'     => 1,
            'status_code' => 200,
            'message'     => esc_html__( 'Showing filtered campaign list.', 'poptics' ),
            'data'        => [
                'total'        => $campaigns['total'],
                'status_count' => $status_count,
                'types'        => $types,
                'goals'        => $goals,
                'items'        => $items,
            ],
        ];

        return rest_ensure_response( $data, 200 );
    }

    /**
     * Delete multiples
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return JSON
     */
    public function bulk_delete( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $campaign_ids = json_decode( $request->get_body(), true );
        $campaign_ids = !empty( $campaign_ids['campaign_ids'] ) ? array_map( 'intval', $campaign_ids['campaign_ids'] ) : [];

        foreach ( $campaign_ids as $campaign_id ) {
            $campaign = new Campaign( $campaign_id );

            if ( !$campaign->is_campaign() ) {
                $data = [
                    'success'     => 0,
                    'status_code' => 422,
                    'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                    'data'        => [],
                ];

                return new WP_HTTP_Response( $data, 422 );
            }

            $campaign->delete();

            do_action( 'poptics_campaign_deleted', $campaign_id );
        }

        return rest_ensure_response( [
            'success'     => 1,
            'status_code' => 200,
            'message'     => esc_html__( 'Successfully deleted all campaigns', 'poptics' ),
            'data'        => [
                'items' => $campaign_ids,
            ],
        ], 200 );
    }

    /**
     * Clone campaign
     *
     * @since 1.0.0
     *
     * @param  Object  $request
     *
     * @return JSON
     */
    public function clone_item( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $campaign_id = (int) $request['campaign_id'];
        $campaign    = new Campaign( $campaign_id );

        if ( !$campaign->is_campaign() ) {
            return new WP_HTTP_Response(
                [
                    'success'     => 0,
                    'status_code' => 422,
                    'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                    'data'        => [],
                ],
                422
            );
        }

        $campaign->clone();

        $item = $this->prepare_item( $campaign );

        apply_filters( 'poptics_store_campaign_taxonomies', $item, $campaign->get_id() );

        $response = [
            'success'     => 1,
            'status_code' => 200,
            'message'     => esc_html__( 'Successfully cloned requested campaign', 'poptics' ),
            'data'        => $item,
        ];

        return rest_ensure_response( $response, 200 );
    }

    /**
     * Create campaign
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return  JSON Newly created campaign data
     */
    public function create_item( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        return $this->save_campaign( $request );
    }

    /**
     * Update campaign
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return JSON  Updated campaign data
     */
    public function update_item( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $campaign_id = (int) $request['campaign_id'];
        $campaign    = new Campaign( $campaign_id );

        if ( !$campaign->is_campaign() ) {

            $response = [
                'success'     => 0,
                'status_code' => 422,
                'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $response, 422 );
        }
        return $this->save_campaign( $request, $campaign_id );
    }

    /**
     * Get single campaign
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return  JSON Single campaign data
     */
    public function get_item( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $campaign_id = (int) $request['campaign_id'];
        $campaign    = new Campaign( $campaign_id );

        $is_for_import = !empty( $request['is_for_import'] ) ? intval( $request['is_for_import'] ) : 0;

        if ( !$campaign->is_campaign() ) {

            $data = [
                'success'     => 0,
                'status_code' => 422,
                'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $data, 422 );
        }

        apply_filters( 'poptics_track_template_import', $is_for_import, $campaign_id );

        $response = [
            'success'     => 1,
            'status_code' => 200,
            'message'     => esc_html__( 'Successfully retrieved campaign', 'poptics' ),
            'data'        => $this->prepare_item( $campaign ),
        ];

        return rest_ensure_response( $response, 200 );
    }

    /**
     * Delete single campaign
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return
     */
    public function delete_item( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $campaign_id = (int) $request['campaign_id'];
        $campaign    = new Campaign( $campaign_id );

        $current_user_id = get_current_user_id();

        if ( !$campaign->is_campaign() ) {
            $data = [
                'status_code' => 422,
                'success'     => 0,
                'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $data, 422 );
        }

        if ( $campaign->get_author() != $current_user_id ) {
            $data = [
                'status_code' => 403,
                'success'     => 0,
                'message'     => __( 'You are not allowed to delete this campaign.', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $data, 403 );
        }

        $campaign->delete();
        do_action( 'poptics_campaign_deleted', $campaign_id );

        $response = [
            'success'     => 1,
            'status_code' => 200,
            'message'     => esc_html__( 'Successfully deleted campaign', 'poptics' ),
            'data'        => [
                'item' => $campaign_id,
            ],
        ];

        return rest_ensure_response( $response, 200 );
    }

    /**
     * Save campaign
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     * @param   integer  $id     Campaign id
     *
     * @return  JSON  Updated campaign data
     */
    public function save_campaign( $request, $id = 0 ) {
        $campaign     = new Campaign( $id );
        $request_body = $request->get_body();
        $data         = !is_null( $request_body ) ? json_decode( $request_body, true ) : [];

        // Check if the input data is empty
        if ( empty( $data ) ) {
            return rest_ensure_response( [
                'status_code' => 400,
                'success'     => 0,
                'message'     => esc_html__( 'No data provided to save the campaign', 'poptics' ),
            ], 400 );
        }

        $name         = !empty( $data['name'] ) ? sanitize_text_field( $data['name'] ) : $campaign->get_name();
        $goal         = !empty( $data['goal'] ) ? poptics_sanitize_recursive( $data['goal'] ) : $campaign->get_goal();
        $type         = !empty( $data['type'] ) ? poptics_sanitize_recursive( $data['type'] ) : $campaign->get_type();
        $steps        = !empty( $data['steps'] ) ? poptics_sanitize_recursive( $data['steps'] ) : $campaign->get_steps();
        $controls     = !empty( $data['controls'] ) ? poptics_sanitize_recursive( $data['controls'] ) : $campaign->get_controls();
        $integrations = !empty( $data['integrations'] ) ? poptics_sanitize_recursive( $data['integrations'] ) : [];
        $status       = ( isset( $data['status'] ) && !empty( $data['status'] ) ) ? sanitize_text_field( strtolower( $data['status'] ) ) : ( $campaign->get_status() ? $campaign->get_status() : 'draft' );

        $action = $id ? 'updated' : 'created';
        // Check if the input data is empty
        if ( empty( $name ) ) {
            return rest_ensure_response( [
                'status_code' => 400,
                'success'     => 0,
                'message'     => esc_html__( 'Campaign name is required', 'poptics' ),
            ], 400 );
        }

        // preparing campaign data.
        $campaign_data = [
            'name'         => $name,
            'goal'         => $goal,
            'type'         => $type,
            'steps'        => $steps,
            'controls'     => $controls,
            'integrations' => $integrations,
            'status'       => $status,
            'blog_id'      => get_current_blog_id(),
        ];

        $campaign->set_props( $campaign_data );
        $campaign_id = $campaign->save();

        apply_filters( 'poptics_store_campaign_taxonomies', $data, $campaign_id );

        // Prepare response data.
        $item = $this->prepare_item( $campaign_id );

        $response = [
            'status_code' => 200,
            'success'     => 1,
            // translators: %s is the name of the action
            'message'     => esc_html( sprintf( __( 'Successfully %s popup campaign', 'poptics' ), $action ) ),
            'data'        => $item,
        ];

        return rest_ensure_response( $response, 200 );
    }

    /**
     * Prepare item for response
     *
     * @since 1.0.0
     *
     * @param   integer  $campaign_id
     *
     * @return  array
     */
    public function prepare_item( $campaign_id ) {
        $campaign = new Campaign( $campaign_id );
        $data     = [
            'id'           => $campaign->get_id(),
            'name'         => $campaign->get_name(),
            'goal'         => $campaign->get_goal(),
            'type'         => $campaign->get_type(),
            'steps'        => $campaign->get_steps(),
            'controls'     => $campaign->get_controls(),
            'integrations' => $campaign->get_integrations(),
            'status'       => $campaign->get_status(),
            'permalink'    => get_permalink( $campaign->get_id() ),
            'author'       => $campaign->get_author(),
        ];

        return apply_filters( 'poptics_prepare_campaign_data', $data );
    }

    /**
     * Tests the email functionality by sending an email based on the provided data.
     *
     * @since 1.0.0
     *
     * @param WP_REST_Request $request The REST request object containing the email data.
     * @return WP_REST_Response The REST response object indicating the success or failure of the email sending.
     */
    public function test_email( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $request_body = $request->get_body();
        $data         = !is_null( $request_body ) ? json_decode( $request_body, true ) : [];

        // Check if the input data is empty
        if ( empty( $data ) ) {
            return rest_ensure_response( [
                'status_code' => 400,
                'success'     => 0,
                'message'     => esc_html__( 'Please give valid data', 'poptics' ),
            ], 400 );
        }

        $receiver_email = !empty( $data['receiver_email'] ) ? sanitize_email( $data['receiver_email'] ) : '';
        $subject        = !empty( $data['subject'] ) ? sanitize_text_field( $data['subject'] ) : '';
        $body           = wp_kses_post( $data['body'] );

        $data = [
            'receiver_email' => $receiver_email,
            'subject'        => $subject,
            'body'           => $body,
        ];

        $campaign_email = new Campaign_Email( $data );
        $result         = $campaign_email->send();

        if ( !$result ) {
            $response = [
                'status_code' => 500,
                'success'     => 0,
                'message'     => esc_html__( 'Failed to send email', 'poptics' ),
                'data'        => [],
            ];

            return rest_ensure_response( $response, 500 );
        }

        $response = [
            'status_code' => 200,
            'success'     => 1,
            'message'     => esc_html__( 'Email sent successfully', 'poptics' ),
            'data'        => [],
        ];

        return rest_ensure_response( $response, 200 );
    }
}
