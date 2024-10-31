<?php

namespace Poptics\Core\Analytics;

use Poptics\Base\Api;
use Poptics\Core\Campaign\Campaign;
use Poptics\Utils\Singleton;
use WP_HTTP_Response;

/**
 * Class API Analytics
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Api_Analytics extends Api {

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
    protected $rest_base = 'analytics';

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
        /**
         * Register retrieve analytics details route
         */
        register_rest_route( $this->namespace, $this->rest_base, [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'get_details'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );
    }

    /**
     * Store the details of a request.
     *
     * This function receives a request object and extracts the request body. It then decodes the request body into an associative array.
     * If the request body is empty, it returns a response with a status code of 400 and an error message.
     *
     * The function then sanitizes and validates the data from the request body. If any of the required fields are missing or invalid,
     * it returns a response with a status code of 400 and an error message.
     *
     * The function creates a new Campaign object with the campaign ID from the request. If the campaign ID is invalid, it returns a response
     * with a status code of 404 and an error message.
     *
     * The function creates a new Analytics object with the sanitized and validated data. It then saves the analytics info using the Analytics object.
     * If the save operation is successful, it returns a response with a status code of 201 and a success message along with the data.
     * If the save operation fails, it returns a response with a status code of 500 and an error message.
     *
     * @param WP_REST_Request $request The request object containing the request body.
     * @return WP_REST_Response The response object containing the status code, success flag, message, and data.
     */
    public function store_details( $data ) {
        $device_type  = $data['device_type'];
        $browser_name = $data['browser_name'];
        $country_name = $data['country_name'];
        $campaign_id  = $data['campaign_id'];
        $page_id      = !empty( $data['page_id'] ) ? intval( $data['page_id'] ) : '';
        $is_viewed    = !empty( $data['is_viewed'] ) ? intval( $data['is_viewed'] ) : 0;
        $is_converted = !empty( $data['is_converted'] ) ? intval( $data['is_converted'] ) : 0;

        $campaign_id = (int) $data['campaign_id'];
        $campaign    = new Campaign( $campaign_id );

        if ( !$campaign->is_campaign() ) {
            $data = [
                'status_code' => 422,
                'success'     => 0,
                'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $data, 422 );
        }

        $data = [
            'device_type'  => $device_type,
            'browser_name' => $browser_name,
            'country_name' => $country_name,
            'page_id'      => $page_id,
            'is_viewed'    => $is_viewed,
            'is_converted' => $is_converted,
            'campaign_id'  => $campaign_id,
        ];

        $analytics = new Analytics( $data );

        $ip_address = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( $_SERVER['REMOTE_ADDR'] ) : '';

        $is_record_already_exists = $analytics->check_if_campaign_already_visited_from_ip( $campaign_id, $ip_address );
        if ( !$is_record_already_exists ) {
            $result = $analytics->save_info();
            $analytics->track_ip( $campaign_id, $ip_address );
            if ( !$result ) {
                $response = [
                    'status_code' => 500,
                    'success'     => 0,
                    'message'     => __( 'Unable to store analytics info', 'poptics' ),
                    'data'        => [],
                ];
            } else {
                $response = [
                    'status_code' => 200,
                    'success'     => 1,
                    'message'     => __( 'Visitors details stored successfully', 'poptics' ),
                    'data'        => $data,
                ];
            }
        } else {
            $response = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => __( 'Visitors details already stored', 'poptics' ),
                'data'        => $data,
            ];
        }

        return rest_ensure_response( $response, $response['status_code'] );
    }

    /**
     * Retrieves the analytics details for a given campaign ID and date range.
     *
     * This function verifies the nonce and retrieves the campaign ID and date range from the request. It then
     * creates a new instance of the Campaign class and checks if the campaign ID is valid. If the campaign ID is invalid,
     * it returns a 404 response. If the campaign ID is valid, it creates a new instance of the Analytics class
     * and retrieves various analytics information. It then returns a 201 response with the analytics data.
     *
     * @since 1.0.0
     *
     * @param WP_REST_Request $request The request object containing the campaign ID and date range.
     * @return WP_HTTP_Response The response object containing the analytics data or error message.
     */
    public function get_details( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $date_range  = !empty( $request['date_range'] ) ? sanitize_text_field( $request['date_range'] ) : '';
        $campaign_id = !empty( $request['campaign_id'] ) ? intval( $request['campaign_id'] ) : '';

        $campaign = new Campaign( $campaign_id );

        if ( !empty( $campaign_id ) && !$campaign->is_campaign() ) {
            $data = [
                'status_code' => 422,
                'success'     => 0,
                'message'     => esc_html__( 'Invalid campaign id.', 'poptics' ),
                'data'        => [],
            ];

            return new WP_HTTP_Response( $data, 422 );
        }

        $data = [
            'date_range'  => $date_range,
            'campaign_id' => $campaign_id,
        ];

        $analytics                                 = new Analytics( $data );
        $data_for_card_view                        = $analytics->get_analytics_overview_for_card_view();
        $statistical_analytics                     = $analytics->get_statistical_analytics_info();
        $device_based_analytics_info_for_pie_chart = $analytics->get_device_based_analytics_info_for_pie_chart();

        $prepared_data = [
            'data_for_card_view'                        => $data_for_card_view,
            'statistical_analytics'                     => $statistical_analytics,
            'device_based_analytics_info_for_pie_chart' => $device_based_analytics_info_for_pie_chart,
        ];

        $prepared_data = apply_filters( 'poptics_analytics_pro_data', $prepared_data, $data );

        $response = [
            'status_code' => 200,
            'success'     => 1,
            'message'     => __( 'Showing dashboard analytics', 'poptics' ),
            'data'        => $prepared_data,
        ];
        return rest_ensure_response( $response, $response['status_code'] );
    }
}
