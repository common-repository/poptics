<?php

namespace Poptics\Core\Onboard;

use Poptics\Base\Api;
use Poptics\Utils\Singleton;
use WP_HTTP_Response;

/**
 * Class onboard api
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Api_Onboard extends Api {
    use Singleton;

    /**
     * Store api namespace
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
    protected $rest_base = 'onboard';

    /**
     * Register necessary routes for REST API
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'onboard'],
                    'permission_callback' => function () {
                        return current_user_can( 'manage_options' );
                    },
                ],
            ]
        );
    }

    /**
     * Onboard setup
     *
     * @since 1.0.0
     *
     * @param \WP_REST_Request $request
     *
     * @return void
     */
    public function onboard( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $request_body = $request->get_body();
        $data         = !is_null( $request_body ) ? json_decode( $request_body, true ) : [];

        $email            = ( isset( $data['email'] ) && !empty( $data['email'] ) ) ? sanitize_email( $data['email'] ) : '';
        $business_name    = ( isset( $data['business_name'] ) && !empty( $data['business_name'] ) ) ? sanitize_text_field( $data['business_name'] ) : '';
        $installed_inside = ( isset( $data['installed_inside'] ) && !empty( $data['installed_inside'] ) ) ? sanitize_url( $data['installed_inside'] ) : '';
        $type_of_using_sites      = ( isset( $data['type_of_using_sites'] ) && !empty( $data['type_of_using_sites'] ) ) ? array_map( 'sanitize_text_field', $data['type_of_using_sites'] ) : [];
        $reasons_of_using_poptics = ( isset( $data['reasons_of_using_poptics'] ) && !empty( $data['reasons_of_using_poptics'] ) ) ? array_map( 'sanitize_text_field', $data['reasons_of_using_poptics'] ) : [];

        $receive_notices = !empty( $data['receive_notices'] ) ? $data['receive_notices'] : 0;
        $data_management = !empty( $data['data_management'] ) ? $data['data_management'] : 0;

        $body = array(
            'email'                    => $email,
            'business_name'            => $business_name,
            'installed_inside'         => $installed_inside,
            'type_of_using_sites'      => $type_of_using_sites,
            'reasons_of_using_poptics' => $reasons_of_using_poptics,
            'receive_notices'          => $receive_notices,
            'data_management'          => $data_management,
        );

        update_option( 'poptics_onboard_details', $body );

        $response = get_option( 'poptics_onboard_details' );

        $response = [
            'status_code' => 200,
            'success'     => 1,
            'data'        => $response,
            'message'     => __( 'Successfully updated onboard details', 'poptics' ),
        ];

        return rest_ensure_response( $response, 200 );
    }
}