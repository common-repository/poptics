<?php
/**
 * Global settings for poptics
 *
 * @since 1.0.0
 *
 * @package Poptics
 */

// Exit if accessed directly
defined( 'ABSPATH' ) || exit;

if ( !function_exists( 'poptics_update_option' ) ) {

    /**
     * Update option
     *
     * @param   string  $key
     *
     * @since 1.0.0
     *
     * @return  boolean
     */
    function poptics_update_option( $key = '', $value = false ) {
        // Get the current settings.
        $options = get_option( 'poptics_settings', [] );

        // Set new settings value.
        $options[$key] = $value;

        // Update the settings.
        $did_update = update_option( 'poptics_settings', $options );

        return $did_update;
    }
}

if ( !function_exists( 'poptics_get_settings' ) ) {

    /**
     * Get settings
     *
     * Retrieve all plugin settings
     *
     * @since 1.0.0
     *
     * @return  array Poptics Settings
     */
    function poptics_get_settings() {
        $settings = get_option( 'poptics_settings' );

        return apply_filters( 'poptics_get_settings', $settings );
    }
}