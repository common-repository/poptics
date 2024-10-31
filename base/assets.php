<?php

namespace Poptics\Base;

use Poptics;

/**
 * Scripts and Styles class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Assets {
    use \Poptics\Utils\Singleton;
    
    /**
     * Initialize
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function init() {
        add_action( 'admin_enqueue_scripts', [$this, 'backend_register'], 5 );
        add_action( 'wp_enqueue_scripts', [$this, 'frontend_register'], 5 );

    }

    /**
     * Register app scripts and styles for admin end
     *
     * @since 1.0.0
     *
     * @param  array $hooks
     *
     * @return  void
     */
    public function backend_register( $hooks ) {

        if ( 'toplevel_page_poptics' != $hooks ) {
            return;
        }

        $this->register_scripts( $this->get_scripts() );
        $this->register_styles( $this->get_styles() );
        $this->enqueue_styles( $this->get_styles() );
    }

    /**
     * Register app scripts and styles for front end
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function frontend_register() {
        $this->register_scripts( $this->get_frontend_scripts() );
        $this->register_styles( $this->get_frontend_styles() );
    }

    /**
     * Register scripts
     *
     * @since 1.0.0
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach ( $scripts as $handle => $script ) {
            $deps      = isset( $script['deps'] ) ? $script['deps'] : [];
            $in_footer = isset( $script['in_footer'] ) ? $script['in_footer'] : true;
            $version   = isset( $script['version'] ) ? $script['version'] : $this->get_version( $script['src'] );

            $deps = $this->get_dependencies( $script['src'], $deps );

            if ( in_array( 'wp-i18n', $deps ) ) {
                $deps[] = 'poptics-i18n';
            }

            wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
        }
    }

    /**
     * Register styles
     *
     * @since 1.0.0
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, \Poptics::get_version() );
        }
    }

    /**
     * Enqueue styles
     *
     * @since 1.0.0
     *
     * @param  array $styles
     *
     * @return void
     */
    public function enqueue_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_enqueue_style( $handle, $style['src'], $deps, \Poptics::get_version() );
        }
    }

    /**
     * Get all registered scripts
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function get_scripts() {
        $scripts = [

            'poptics-script'      => [
                'src'       => Poptics::url( 'assets/build/js/dashboard.js' ),
                'deps'      => ['jquery', 'wp-format-library'],
                'in_footer' => false,
            ],
            'poptics-packages'    => [
                'src'       => Poptics::url( 'assets/build/js/packages.js' ),
                'in_footer' => false,
            ],
            'poptics-guten-block' => [
                'src'       => Poptics::url( 'assets/build/js/guten-block.js' ),
                'in_footer' => false,
            ],
        ];

        return apply_filters( 'poptics_register_scripts', $scripts );
    }

    /**
     * Get all registered scripts
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function get_frontend_scripts() {

        $scripts = [
            'poptics-frontend-script' => [
                'src'       => Poptics::url( 'assets/build/js/frontend.js' ),
                'deps'      => ['jquery','wp-blocks', 'wp-element', 'wp-block-library'],
                'in_footer' => false,
            ],
            'poptics-guten-block'     => [
                'src'       => Poptics::url( 'assets/build/js/guten-block.js' ),
                'in_footer' => false,
            ],
        ];
        return apply_filters( 'poptics_frontend_register_scripts', $scripts );
    }

    /**
     * Get registered styles
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function get_styles() {

        $styles = [
            'poptics-admin' => [
                'src'  => Poptics::url( 'assets/build/css/admin.css' ),
                'deps' => ['wp-edit-blocks'],
            ],
        ];

        return apply_filters( 'poptics_register_styles', $styles );
    }

    /**
     * Get frontend registered styles
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function get_frontend_styles() {

        $styles = [
            'poptics-frontend' => [
                'src'  => Poptics::url( 'assets/build/css/frontend.css' ),
                'deps' => ['wp-edit-blocks'],

            ],
        ];

        return apply_filters( 'poptics_frontend_register_styles', $styles );
    }

    /**
     * Get script and style file dependencies
     *
     * @since 1.0.0
     *
     * @param   string  $file_name
     * @param   array  $deps
     *
     * @return  array
     */
    private function get_dependencies( $file_name, $deps = [] ) {
        $assets      = $this->get_file_assets( $file_name );
        $assets_deps = !empty( $assets['dependencies'] ) ? $assets['dependencies'] : [];

        return array_merge( $assets_deps, $deps );
    }

    /**
     * Get script file version
     *
     * @since 1.0.0
     *
     * @param   string  $file_name
     *
     * @return  string
     */
    private function get_version( $file_name ) {
        $assets_deps = $this->get_file_assets( $file_name );

        $version = !empty( $assets_deps['version'] ) ? $assets_deps['version'] : \Poptics::get_version();

        return $version;
    }

    /**
     * Get file assets
     *
     * @since 1.0.0
     *
     * @param   string  $file_name
     *
     * @return  array
     */
    private function get_file_assets( $file_url ) {
        $file = $this->get_file_path( $file_url );

        $assets = [];

        if ( file_exists( $file ) ) {
            $assets = include $file;
        }

        return $assets;
    }

    /**
     * Get file path from url
     *
     * @param   string  $url
     *
     * @return string
     */
    private function get_file_path( $url ) {
        $path = explode( 'poptics', wp_parse_url( $url )['path'] );
        // remove the first slash / from path
        $clean_path = ltrim( $path[1], '/' );
        // remove .js file with asset.php extension
        $clean_path = str_replace( '.js', '.asset.php', $clean_path );
        // full path
        $clean_path = rtrim( Poptics::plugin_dir(), '/' ) . DIRECTORY_SEPARATOR . $clean_path;

        return $clean_path;
    }
}