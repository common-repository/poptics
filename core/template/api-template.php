<?php

namespace Poptics\Core\Template;

use Poptics\Base\Api;
use Poptics\Utils\Singleton;
use WP_HTTP_Response;

/**
 * Class API Campaign
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Api_Template extends Api {

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
    protected $rest_base = 'remote';

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
     * Store cache group name
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $cache_group = 'poptics_template_api';

    /**
     * Register rest routes.
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function register_routes() {
        /**
         * Register popup-templates category list API
         */
        register_rest_route( $this->namespace, $this->rest_base . '/categories', [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'template_categories'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );

        /**
         * Register popup-templates API
         */
        register_rest_route( $this->namespace, $this->rest_base . '/templates', [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [$this, 'templates'],
                'permission_callback' => function () {
                    return current_user_can( 'manage_options' );
                },
            ],
        ] );
    }

    /**
     * Fetch template categories
     *
     * @since 1.0.0
     *
     * @return \WP_REST_Response
     */
    public function template_categories() {
        $file_path = POPTICS_PLUGIN_DIR . '/data/template_categories.php';

        if ( !file_exists( $file_path ) ) {
            $response = [
                'success'     => 0,
                'status_code' => 500,
                'message'     => esc_html__( 'Template categories not found', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 500 );
        }

        // Include the PHP file and assign its return value to a variable
        $data = include $file_path;

        if ( !is_array( $data ) ) {
            $response = [
                'success'     => 0,
                'status_code' => 500,
                'message'     => esc_html__( 'Template categories not found', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 500 );
        }

        $response = [
            'success'     => 1,
            'status_code' => 200,
            'message'     => esc_html__( 'All template categories', 'poptics' ),
            'data'        => $data,
        ];

        return rest_ensure_response( $response, 200 );
    }

    /**
     * Retrieve templates from Aethonic demo site.
     *
     * Retrieves templates from Aethonic demo site and cache them for 10 seconds.
     * If the transient is not set or is expired, it will call the Aethonic demo site
     * to fetch the templates.
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response
     */
    public function templates( $request ) {
        $response = poptics_verify_nonce( $request->get_header( 'x_wp_nonce' ) );
        if ( $response instanceof WP_HTTP_Response ) {
            return $response;
        }

        $file_path = POPTICS_PLUGIN_DIR . '/data/templates.php';

        if ( !file_exists( $file_path ) ) {
            $response = [
                'success'     => 0,
                'status_code' => 500,
                'message'     => esc_html__( 'Templates not found', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 500 );
        }

        // Include the PHP file and assign its return value to a variable
        $data = include $file_path;

        if ( !is_array( $data ) ) {
            $response = [
                'success'     => 0,
                'status_code' => 500,
                'message'     => esc_html__( 'Templates not found', 'poptics' ),
                'data'        => [],
            ];
            return rest_ensure_response( $response, 500 );
        }

        $response = [
            'success'     => 1,
            'status_code' => 200,
            'message'     => esc_html__( 'All templates lists', 'poptics' ),
            'data'        => $data,
        ];

        return rest_ensure_response( $response, 200 );
    }
}