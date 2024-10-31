<?php

namespace Poptics\Core\Settings;

use Poptics\Base\Api;
use Poptics\Utils\Singleton;
use WP_HTTP_Response;

/**
 * Class Api Settings
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Api_Settings extends Api {
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
    protected $rest_base = 'settings';

    /**
     * Register rest route
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace, $this->rest_base, [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_settings'],
                    'permission_callback' => function () {
                        return current_user_can( 'manage_options' );
                    },
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [$this, 'update_settings'],
                    'permission_callback' => function () {
                        return current_user_can( 'manage_options' );
                    },
                ],
            ]
        );
    }

    /**
     * Get settings
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return  JSON
     */
    public function get_settings( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $settings = apply_filters( 'poptics_settings', poptics_get_settings() );

        if ( !$settings ) {
            $data = [
                'status_code' => 200,
                'success'     => 1,
                'message'     => esc_html__( 'Settings data not found', 'poptics' ),
                'data'        => null,
            ];
            return rest_ensure_response( $data, 404 );
        }

        $data = [
            'status_code' => 200,
            'success'     => 1,
            'message'     => esc_html__( 'Get all settings', 'poptics' ),
            'data'        => $settings,
        ];
        return rest_ensure_response( $data, 200 );
    }

    /**
     * Update settings
     *
     * @since 1.0.0
     *
     * @param   WP_Rest_Request  $request
     *
     * @return  JSON
     */
    public function update_settings( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $body    = $request->get_body();
        $options = !empty( $body ) ? poptics_sanitize_recursive( json_decode( $body, true ) ) : [];

        if ( $options ) {
            foreach ( $options as $key => $value ) {
                poptics_update_option( $key, $value );
            }
        }

        $data = [
            'status_code' => 200,
            'success'     => 1,
            'message'     => esc_html__( 'Settings successfully updated', 'poptics' ),
            'data'        => poptics_get_settings(),
        ];

        return rest_ensure_response( $data );
    }
}