<?php

namespace Poptics\Core\Admin;

use Poptics\Utils\Singleton;

/**
 * Admin hook class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Hook {
    use Singleton;

    /**
     * Initializing admin hook
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        add_action( 'admin_init', [$this, 'redirect_onboard'] );

        add_action( 'wp_initialize_site', array( $this, 'install_necessary_tables_to_multisite' ) );
        add_action( 'wp_delete_site', array( $this, 'delete_custom_tables_on_site_deletion' ) );
    }

    /**
     * Show on-boarding page if on-boarding information not taken already
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function redirect_onboard() {
        $onboarding_setup = get_option( 'poptics_onboard_settings' );

        if ( $onboarding_setup ) {
            return;
        }

        update_option( 'poptics_onboard_settings', true );

        $redirect_url = esc_url( admin_url( 'admin.php?page=poptics#/onboard' ) );
        wp_redirect( $redirect_url );
        exit;
    }

    /**
     * Installs necessary tables to the multisite database.
     *
     * This function is triggered when a new site is initialized in a multisite environment.
     * It creates the necessary tables for storing campaign analytics data.
     *
     * @since 1.0.0
     *
     * @param object $new_site The new site object.
     * @return void
     */
    public function install_necessary_tables_to_multisite( $new_site ) {
        global $wpdb;

        // Switch to the new site
        switch_to_blog( $new_site->blog_id );

        // Define your SQL queries as an array of strings
        $queries = [
            "SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';",
            "START TRANSACTION;",
            "SET time_zone = '+00:00';",

            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}campaign_visited_from_ip` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `campaign_id` bigint(20) UNSIGNED DEFAULT NULL,
                `ip_address` varchar(150) DEFAULT NULL,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;",

            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}poptics_analytics` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `campaign_id` bigint(20) UNSIGNED DEFAULT NULL,
                `date` date DEFAULT NULL,
                `views` int(11) DEFAULT 0,
                `visitors` int(11) DEFAULT 0,
                `conversions` int(11) DEFAULT 0,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;",

            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}poptics_analytics_meta` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `analytics_id` int(11) DEFAULT NULL,
                `campaign_id` bigint(20) UNSIGNED DEFAULT NULL,
                `date` date DEFAULT NULL,
                `meta_key` varchar(150) DEFAULT NULL,
                `meta_value` text DEFAULT NULL,
                PRIMARY KEY (`id`),
                KEY `FK_{$wpdb->prefix}poptics_analytics_meta_{$wpdb->prefix}poptics_analytics` (`analytics_id`),
                KEY `campaign_id` (`campaign_id`),
                KEY `date` (`date`),
                KEY `meta_key` (`meta_key`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;",

            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}poptics_submissions` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `campaign_id` bigint(20) DEFAULT NULL,
                `email` varchar(150) DEFAULT NULL,
                `browser` varchar(150) DEFAULT NULL,
                `device` varchar(150) DEFAULT NULL,
                `location` varchar(150) DEFAULT NULL,
                `status` varchar(150) DEFAULT 'active',
                `date` timestamp NULL DEFAULT current_timestamp(),
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;",

            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}poptics_submissions_meta` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `submission_id` int(11) DEFAULT NULL,
                `meta_key` varchar(150) DEFAULT NULL,
                `meta_value` longtext DEFAULT NULL,
                PRIMARY KEY (`id`),
                KEY `FK_{$wpdb->prefix}poptics_submissions_meta_{$wpdb->prefix}poptics_submissions` (`submission_id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;",

            "ALTER TABLE `{$wpdb->prefix}poptics_analytics_meta`
                ADD CONSTRAINT `FK_{$wpdb->prefix}poptics_analytics_meta_{$wpdb->prefix}poptics_analytics` FOREIGN KEY (`analytics_id`) REFERENCES `{$wpdb->prefix}poptics_analytics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;",

            "ALTER TABLE `{$wpdb->prefix}poptics_submissions_meta`
                ADD CONSTRAINT `FK_{$wpdb->prefix}poptics_submissions_meta_{$wpdb->prefix}poptics_submissions` FOREIGN KEY (`submission_id`) REFERENCES `{$wpdb->prefix}poptics_submissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;",

            "COMMIT;",
        ];

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        // Execute each query
        foreach ( $queries as $query ) {
            dbDelta( $query );
        }

        // Switch back to the original site
        restore_current_blog();
    }

    /**
     * Deletes custom tables on site deletion.
     *
     * This function is triggered when a site is deleted and deletes the custom tables
     * associated with that site. It switches to the site being deleted, drops the
     * specified tables, and then restores the original blog context.
     *
     * @since 1.0.0
     *
     * @param object $old_site The site being deleted.
     * @return void
     */
    public function delete_custom_tables_on_site_deletion( $old_site ) {
        $site_id = $old_site->blog_id;

        global $wpdb;

        // Switch to the site being deleted
        switch_to_blog( $site_id );

        // Define tables to be dropped
        $tables = [
            $wpdb->prefix . 'campaign_visited_from_ip',
            $wpdb->prefix . 'poptics_analytics',
            $wpdb->prefix . 'poptics_analytics_meta',
            $wpdb->prefix . 'poptics_submissions',
            $wpdb->prefix . 'poptics_submissions_meta',
        ];

        // Suppress PHPCS warnings for direct database calls, schema changes, and lack of caching
        // phpcs:disable WordPress.DB.SchemaChange
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
        // phpcs:disable WordPress.DB.PreparedSQL.NotPrepared

        $wpdb->query( 'SET FOREIGN_KEY_CHECKS = 0;' );

        foreach ( $tables as $table ) {
            $wpdb->query( "DROP TABLE IF EXISTS `$table`;" );
        }

        $wpdb->query( 'SET FOREIGN_KEY_CHECKS = 1;' );

        // phpcs:enable WordPress.DB.SchemaChange
        // phpcs:enable WordPress.DB.DirectDatabaseQuery.NoCaching
        // phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery
        // phpcs:enable WordPress.DB.PreparedSQL.NotPrepared

        // Restore the original blog context
        restore_current_blog();
    }

}