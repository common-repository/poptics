<?php

namespace Poptics\Base;

/**
 * Admin class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Admin {
    use \Poptics\Utils\Singleton;
    
    /**
     * Initialize the class
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function init() {
        add_action( 'admin_enqueue_scripts', [$this, 'enqueue_scripts'], 10 );
    }

    /**
     * Enqueue scripts and styles
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function enqueue_scripts() {
        wp_enqueue_media();
        wp_enqueue_script( 'wp-edit-post' );
        wp_enqueue_script( 'poptics-script' );
        wp_enqueue_script( 'poptics-packages' );
        wp_enqueue_script( 'poptics-guten-block' );
        wp_set_script_translations( 'poptics-script', 'poptics' );
        wp_enqueue_style( 'poptics-style' );

        $localize_obj = array(
            'site_url'             => site_url(),
            'admin_url'            => admin_url(),
            'nonce'                => wp_create_nonce( 'wp_rest' ),
            'published_posts'      => poptics_get_active_posts( 'post' ),
            'published_pages'      => poptics_get_active_posts( 'page' ),
            'woocommerce_products' => poptics_get_active_posts( 'product' ),
        );

        $localize_obj = apply_filters( 'poptics_admin_localize_data', $localize_obj );

        wp_localize_script( 'poptics-script', 'poptics', $localize_obj );

        $settings = poptics_editor_settings();
        wp_add_inline_script( 'poptics-script', 'window.popticsEditorSettings = ' . wp_json_encode( $settings ) . ';' );
    }
}