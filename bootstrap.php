<?php
/**
 * Bootstrap Class
 *
 * @package Poptics
 */

namespace Poptics;

defined( 'ABSPATH' ) || exit;

/**
 * Bootstrap class.
 *
 * @since 1.0.0
 */
final class Bootstrap {

    /**
     * @var Bootstrap The Actual Poptics instance.
     * @since 1.0.0
     */
    private static $instance;

    /**
     * @var $file The root Poptics file path.
     * @since 1.0.0
     */
    private $file;

    /**
     * @var $version The current Poptics version.
     * @since 1.0.0
     */
    private $version;

    /**
     * Throw Error While Trying To Clone Object
     *
     * @since 1.0.0
     * @return void
     */
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, esc_html__( 'Cloning is forbidden.', 'poptics' ), '1.0.0' );
    }

    /**
     * Disabling Un-serialization Of This Class
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, esc_html__( 'Unserializing instances of this class is forbidden.', 'poptics' ), '1.0.0' );
    }

    /**
     * The actual Poptics instance
     *
     * @since 1.0.0
     * @param string $file The root filepath.
     * @return object
     */
    public static function instantiate( $file = '' ) {

        // Return if already instantiated.
        if ( self::instantiated() ) {
            return self::$instance;
        }

        self::prepare_instance( $file );

        self::$instance->initialize_constants();
        self::$instance->define_tables();
        self::$instance->include_files();
        self::$instance->initialize_components();

        return self::$instance;
    }

    /**
     * Return If The Main Class has Already Been Instantiated Or Not
     *
     * @since 1.0.0
     * @return boolean
     */
    private static function instantiated() {
        if ( ( null !== self::$instance ) && ( self::$instance instanceof Bootstrap ) ) {
            return true;
        }

        return false;
    }

    /**
     * Prepare Singleton Instance.
     *
     * @since 1.0.0
     * @param string $file The root file path.
     * @return void
     */
    private static function prepare_instance( $file = '' ) {
        self::$instance          = new self();
        self::$instance->file    = $file;
        self::$instance->version = \Poptics::get_version();
    }

    /**
     * Assets Directory URL
     *
     * @since 1.0.0
     *
     * @return string
     */
    public function get_assets_url() {
        return trailingslashit( POPTICS_PLUGIN_URL . 'assets' );
    }

    /**
     * Assets Directory Path
     *
     * @since 1.0.0
     *
     * @return string
     */
    public function get_assets_dir() {
        return trailingslashit( POPTICS_PLUGIN_DIR . 'assets' );
    }

    /**
     * Plugin Directory URL
     *
     * @return string
     */
    public function get_plugin_url() {
        return trailingslashit( plugin_dir_url( POPTICS_PLUGIN_FILE ) );
    }

    /**
     * Plugin Directory Path
     *
     * @return string
     */
    public function get_plugin_dir() {
        return \Poptics::get_plugin_dir();
    }

    /**
     * Plugin Basename
     *
     * @return string
     */
    public function get_plugin_basename() {
        return plugin_basename( POPTICS_PLUGIN_FILE );
    }

    /**
     * Setup Plugin Constants
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function initialize_constants() {
        // Plugin Version.
        self::$instance->define( 'POPTICS_VERSION', \Poptics::get_version() );

        // Plugin Main File.
        self::$instance->define( 'POPTICS_PLUGIN_FILE', $this->file );

        // Plugin File Basename.
        self::$instance->define( 'POPTICS_PLUGIN_BASE', $this->get_plugin_basename() );

        // Plugin Main Directory Path.
        self::$instance->define( 'POPTICS_PLUGIN_DIR', $this->get_plugin_dir() );

        // Plugin Main Directory URL.
        self::$instance->define( 'POPTICS_PLUGIN_URL', $this->get_plugin_url() );

        // Plugin Assets Directory URL.
        self::$instance->define( 'POPTICS_ASSETS_URL', $this->get_assets_url() );

        // Plugin Assets Directory Path.
        self::$instance->define( 'POPTICS_ASSETS_DIR', $this->get_assets_dir() );

        // Disable Debug mode in production.
        self::$instance->define( 'POPTICS_DEBUG_MODE', false );
    }

    /**
     * Define constant if not already set.
     *
     * @since 1.0.0
     * @param string      $name  Constant name.
     * @param string|bool $value Constant value.
     */
    private function define( $name, $value ) {
        if ( !defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Define DB Tables Required For This Plugin
     *
     * @since 1.0.0
     * @return void
     */
    private function define_tables() {
        // To Be Implemented.
    }

    /**
     * Include All Required Files
     *
     * @since 1.0.0
     * @return void
     */
    private function include_files() {
        /**
         * Core helpers.
         */
        require_once POPTICS_PLUGIN_DIR . 'utils/global-helper.php';

        //Requiring core settings file
        require_once POPTICS_PLUGIN_DIR . '/core/settings/settings.php';

        //Requiring analytics-config file
        require_once POPTICS_PLUGIN_DIR . '/core/analytics/analytics-config.php';
    }

    /**
     * Initialize All Components
     *
     * @since 1.0.0
     * @return void
     */
    private function initialize_components() {
        // Register admin menu
        Core\Base::instance()->init();
        Base\Admin::instance()->init();
        Base\Assets::instance()->init();
    }

    /**
     * What type of request.
     *
     * @param string $type admin,frontend, ajax, cron.
     *
     * @since 1.0.0
     *
     * @return boolean
     */
    private function is_request( $type ) {
        switch ( $type ) {
        case 'admin':
            return is_admin();
        case 'ajax':
            return defined( 'DOING_AJAX' );
        case 'cron':
            return defined( 'DOING_CRON' );
        case 'frontend':
            return ( !is_admin() || defined( 'DOING_AJAX' ) ) && !defined( 'DOING_CRON' ) && !$this->is_rest_api_request();
        }
    }

    /**
     * Returns if the request is non-legacy REST API request.
     *
     * @return boolean
     */
    private function is_rest_api_request() {
        $server_request = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : false;

        if ( !$server_request ) {
            return false;
        }

        $rest_prefix     = trailingslashit( rest_get_url_prefix() );
        $is_rest_request = ( false !== strpos( $server_request, $rest_prefix ) );

        return apply_filters( 'poptics_is_rest_api_request', $is_rest_request );
    }
}

/**
 * Returns The Instance Of Poptics.
 *
 * The main function that is responsible for returning Poptics instance.
 *
 * @since 1.0.0
 *
 * @return Poptics
 */
function poptics() {
    return Bootstrap::instantiate();
}