<?php
/**
 * Analytics config for poptics
 *
 * @since 1.0.0
 *
 * @package Poptics
 */

// Exit if accessed directly
defined( 'ABSPATH' ) || exit;

/**
 * Retrieves a list of popular web browsers with their corresponding names.
 *
 * @since 1.0.0
 *
 * @return array List of popular web browsers with their names as key-value pairs.
 */
function poptics_analytics_browser_list() {
    $browser_list = [
        'google_chrome'  => 'Google Chrome',
        'firefox'        => 'Mozilla Firefox',
        'safari'         => 'Safari',
        'microsoft_edge' => 'Microsoft Edge',
        'opera'          => 'Opera',
        'brave'          => 'Brave',
        'others'         => 'Others',
    ];

    $browser_list = apply_filters( 'poptics_analytics_browser_list', $browser_list );
    return $browser_list;
}

/**
 * Returns a list of devices with their corresponding names.
 *
 * @since 1.0.0
 *
 * @return array An associative array where the keys are device names and the values are device types.
 */
function poptics_analytics_device_list() {
    $device_list = [
        'desktop' => 'Desktop',
        'tablet'  => 'Tablet',
        'mobile'  => 'Mobile',
    ];

    $device_list = apply_filters( 'poptics_analytics_device_list', $device_list );
    return $device_list;
}

/**
 * Returns a list of countries with their corresponding names.
 *
 * @since 1.0.0
 *
 * @return array An associative array where the keys are country names and the values are country codes.
 */
function poptics_analytics_country_list() {
    $country_list = [
        'bangladesh' => 'Bangladesh',
        'india'      => 'India',
        'pakistan'   => 'Pakistan',
    ];

    $country_list = apply_filters( 'poptics_analytics_country_list', $country_list );
    return $country_list;
}