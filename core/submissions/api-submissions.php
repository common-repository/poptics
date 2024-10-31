<?php

/**
 * Class API Submissions
 *
 * @since 1.0.0
 *
 * @package Poptics
 */

namespace Poptics\Core\Submissions;

use Poptics\Base\Api;
use Poptics\Core\Analytics\Api_Analytics;
use Poptics\Core\Campaign\Campaign;
use Poptics\Utils\Singleton;
use WP_HTTP_Response;

class Api_Submissions extends Api {

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
    protected $rest_base = 'submissions';

    /**
     * Submission analytics rest base
     *
     * @var string
     */
    protected $submission_analytics_rest_base = 'store-submission-analytics';

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
        register_rest_route( $this->namespace, $this->submission_analytics_rest_base, [
            [
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => [$this, 'store_details'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );

        register_rest_route( $this->namespace, $this->rest_base, [
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

        register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<submission_id>[\d]+)', [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'get_item'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
            [
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => [$this, 'update_status'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
            [
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => [$this, 'delete_submission'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );

        register_rest_route( $this->namespace, $this->rest_base . '/user-agent-info', [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'user_agent_info'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );
    }

    /**
     * Store the submission details
     *
     * @param WP_REST_Request $request Full details about the request.
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function store_details( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $request_body   = $request->get_body();
        $requested_data = !is_null( $request_body ) ? json_decode( $request_body, true ) : [];

        // Check if the input data is empty
        if ( empty( $requested_data ) ) {
            return rest_ensure_response( [
                'status_code' => 400,
                'success'     => 0,
                'message'     => esc_html__( 'No data provided', 'poptics' ),
            ], 400 );
        }

        $campaign_id   = !empty( $requested_data['campaign_id'] ) ? intval( $requested_data['campaign_id'] ) : 0;
        $email         = !empty( $requested_data['email'] ) ? sanitize_email( $requested_data['email'] ) : '';
        $browser       = !empty( $requested_data['browser_name'] ) ? sanitize_text_field( $requested_data['browser_name'] ) : '';
        $location      = !empty( $requested_data['country_name'] ) ? sanitize_text_field( $requested_data['country_name'] ) : '';
        $device        = !empty( $requested_data['device_type'] ) ? sanitize_text_field( $requested_data['device_type'] ) : '';
        $other_details = !empty( $requested_data['other_details'] ) ? poptics_sanitize_recursive( $requested_data['other_details'] ) : '';

        if ( empty( $requested_data['browser_name'] ) || empty( $requested_data['country_name'] ) || empty( $requested_data['device_type'] ) ) {
            $response = [
                'status_code' => 400,
                'success'     => 0,
                'message'     => esc_html__( 'Valid email, browser, country and device are required. Please check and try again', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $response, 400 );
        }

        $campaign = new Campaign( $campaign_id );

        if ( !$campaign->is_campaign() ) {
            $response = [
                'status_code' => 422,
                'success'     => 0,
                'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $response, 422 );
        }

        $data = [
            'campaign_id'   => $campaign_id,
            'email'         => $email,
            'browser'       => $browser,
            'location'      => $location,
            'device'        => $device,
            'other_details' => $other_details,
        ];

        if ( !empty( $requested_data['email'] ) ) {
            $submission_result = $this->handle_submission_store( $data );
            if ( !$submission_result ) {
                $response = [
                    'status_code' => 500,
                    'success'     => 0,
                    'message'     => __( 'Unable to store submission details', 'poptics' ),
                    'data'        => [],
                ];
                return rest_ensure_response( $response, 500 );
            }
        }

        $analytics_result = $this->handle_analytics_store( $requested_data );
        if ( !$analytics_result ) {
            $response = [
                'status_code' => 500,
                'success'     => 0,
                'message'     => __( 'Unable to store analytics info', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 500 );
        }

        $response = [
            'status_code' => 200,
            'success'     => 1,
            'message'     => __( 'Submission & analytics details stored successfully', 'poptics' ),
            'data'        => $data,
        ];

        return rest_ensure_response( $response, 200 );
    }

    /**
     * Handles storing analytics data using the Api_Analytics class
     *
     * @param array $requested_data The request data containing the analytics information
     *
     * @return bool The result of the analytics store operation
     */
    public function handle_analytics_store( $requested_data ) {
        $api_analytics = new Api_Analytics();
        $result        = $api_analytics->store_details( $requested_data );

        return $result;
    }

    /**
     * Handles storing submission data using the Submission class
     *
     * @param array $data The request data containing the submission information
     *
     * @return bool The result of the submission store operation
     */
    public function handle_submission_store( $data ) {
        $submission = new Submission( $data );
        $match_case = [
            'email'       => $data['email'],
            'campaign_id' => $data['campaign_id'],
        ];
        $is_already_exists = $submission->check_if_submission_already_exists( $match_case );

        if ( !$is_already_exists ) {
            $result = $submission->save();
            do_action( 'poptics_after_submission_create', $data );
            return $result;
        }

        return true;
    }

    /**
     * Update submission status
     *
     * @since 1.0.0
     *
     * @param WP_Rest_Request $request The request object.
     *
     * @return WP_HTTP_Response The response object.
     */
    public function update_status( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $status        = !empty( $request['status'] ) ? sanitize_text_field( $request['status'] ) : '';
        $submission_id = !empty( $request['submission_id'] ) ? intval( $request['submission_id'] ) : '';

        if ( empty( $status ) || !in_array( $status, ['active', 'trash'] ) ) {
            $response = [
                'status_code' => 400,
                'success'     => 0,
                'message'     => esc_html__( 'Invalid submission status', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $response, 400 );
        }

        if ( empty( $submission_id ) ) {
            $response = [
                'status_code' => 400,
                'success'     => 0,
                'message'     => esc_html__( 'Submission id is required', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $response, 400 );
        }

        $data = [
            'submission_id' => $submission_id,
            'status'        => $status,
        ];

        $submission = new Submission( $data );

        $match_case = [
            'status'        => $status,
            'submission_id' => $submission_id,
        ];

        $is_already_exists = $submission->check_if_submission_already_exists( $match_case );

        if ( $is_already_exists ) {
            $response = [
                'status_code' => 409,
                'success'     => 0,
                'message'     => __( 'Status already updated', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 409 );
        }

        $result = $submission->update_submission_status();

        if ( !$result ) {
            $response = [
                'status_code' => 500,
                'success'     => 0,
                'message'     => __( 'Unable to update submission status', 'poptics' ),
                'data'        => [],
            ];
        } else {
            $response = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => __( 'Submission status updated', 'poptics' ),
                'data'        => $data,
            ];
        }

        return rest_ensure_response( $response, $response['status_code'] );
    }

    /**
     * Handles the deletion of a submission via the REST API.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response The response object.
     */
    public function delete_submission( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $submission_id = (int) $request['submission_id'];

        $data = [
            'submission_id' => $submission_id,
        ];

        $submission = new Submission( $data );

        $match_case = [
            'submission_id' => $submission_id,
        ];

        $is_valid_submission = $submission->check_if_submission_already_exists( $match_case );

        if ( !$is_valid_submission ) {
            $response = [
                'status_code' => 422,
                'success'     => 0,
                'message'     => __( 'Invalid submission id', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 422 );
        }

        $result = $submission->delete_submission();

        if ( !$result ) {
            $response = [
                'status_code' => 500,
                'success'     => 0,
                'message'     => __( 'Submission not deleted', 'poptics' ),
                'data'        => [],
            ];
        } else {
            $response = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => __( 'Submission deleted successfully', 'poptics' ),
                'data'        => $data,
            ];
        }

        return rest_ensure_response( $response, $response['status_code'] );
    }

    /**
     * Bulk delete submissions
     *
     * @since 1.0.0
     *
     * @param WP_Rest_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function bulk_delete( $request ) {

        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $submission_ids = json_decode( $request->get_body(), true );
        $submission_ids = !empty( $submission_ids['submission_ids'] ) ? array_map( 'intval', $submission_ids['submission_ids'] ) : [];
        $data           = [
            'submission_ids' => $submission_ids,
        ];

        $submission = new Submission( $data );
        $result     = $submission->bulk_delete_submissions();

        if ( !$result ) {
            $response = [
                'status_code' => 500,
                'success'     => 0,
                'message'     => __( 'Unable to delete submissions', 'poptics' ),
                'data'        => [],
            ];
        } else {
            $response = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => __( 'Submissions deleted successfully', 'poptics' ),
                'data'        => [],
            ];
        }

        return rest_ensure_response( $response, $response['status_code'] );
    }

    /**
     * Retrieves a single submission.
     *
     * @since 1.0.0
     *
     * @param WP_Rest_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_item( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $submission_id = (int) $request['submission_id'];

        $data = [
            'submission_id' => $submission_id,
        ];

        $submission = new Submission( $data );

        $match_case = [
            'submission_id' => $submission_id,
        ];

        $is_valid_submission = $submission->check_if_submission_already_exists( $match_case );

        if ( !$is_valid_submission ) {
            $response = [
                'status_code' => 422,
                'success'     => 0,
                'message'     => __( 'Invalid submission id', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 422 );
        }

        $submission_details = $submission->get_single_submission_details();

        if ( $submission_details ) {
            $response = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => __( 'Single submission details', 'poptics' ),
                'data'        => $submission_details,
            ];
        } else {
            $response = [
                'status_code' => 404,
                'success'     => 0,
                'message'     => __( 'Submission not found', 'poptics' ),
                'data'        => [],
            ];
        }

        return rest_ensure_response( $response, $response['status_code'] );
    }

    /**
     * Retrieves a collection of submissions.
     *
     * @since 1.0.0
     *
     * @param WP_Rest_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_items( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $per_page    = !empty( $request['per_page'] ) ? intval( $request['per_page'] ) : '';
        $paged       = !empty( $request['paged'] ) ? intval( $request['paged'] ) : '';
        $campaign_id = !empty( $request['campaign_id'] ) ? intval( $request['campaign_id'] ) : '';
        $status      = !empty( $request['status'] ) ? sanitize_text_field( $request['status'] ) : '';
        $location    = !empty( $request['location'] ) ? sanitize_text_field( $request['location'] ) : '';
        $device      = !empty( $request['device'] ) ? sanitize_text_field( $request['device'] ) : '';
        $browser     = !empty( $request['browser'] ) ? sanitize_text_field( $request['browser'] ) : '';
        $search_key  = !empty( $request['search_key'] ) ? sanitize_text_field( $request['search_key'] ) : '';

        $data = [
            'campaign_id' => $campaign_id,
            'status'      => $status,
            'location'    => $location,
            'device'      => $device,
            'browser'     => $browser,
            'search_key'  => $search_key,
            'per_page'    => $per_page,
            'paged'       => $paged,
        ];

        $submission = new Submission( $data );

        $submissions = $submission->get_all_submissions();

        if ( $submissions ) {
            $response = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => __( 'Submissions details', 'poptics' ),
                'data'        => [
                    'query_total'  => $submissions['total'],
                    'status_count' => $submissions['status_count'],
                    'items'        => $submissions['details'],
                ],
            ];
        } else {
            $response = [
                'status_code' => 404,
                'success'     => 0,
                'message'     => __( 'Submissions not found', 'poptics' ),
                'data'        => [],
            ];
        }

        return rest_ensure_response( $response, $response['status_code'] );

    }

    /**
     * Retrieves user agent details.
     *
     * @param WP_REST_Request $request {
     *     @type string $agent The type of user agent to retrieve.
     *                          Can be 'browser', 'device', 'location'.
     * }
     *
     * @return WP_REST_Response
     */
    public function user_agent_info( $request ) {

        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $agent = !empty( $request['agent'] ) ? sanitize_text_field( $request['agent'] ) : '';

        $submission = new Submission();

        if ( empty( $agent ) ) {
            $user_agent = $submission->get_user_agent();
        } elseif ( $agent == 'browser' ) {
            $user_agent = $submission->get_browsers();
        } elseif ( $agent == 'device' ) {
            $user_agent = $submission->get_devices();
        } elseif ( $agent == 'location' ) {
            $user_agent = $submission->get_locations();
        }

        if ( $user_agent ) {
            $response = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => __( 'Submissions user agents', 'poptics' ),
                'data'        => $user_agent,
            ];
        } else {
            $response = [
                'status_code' => 404,
                'success'     => 0,
                'message'     => __( 'Submissions user agents not found', 'poptics' ),
                'data'        => [],
            ];
        }

        return rest_ensure_response( $response, $response['status_code'] );
    }
}