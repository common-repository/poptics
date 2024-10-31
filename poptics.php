<?php

/**
 * Plugin Name:       Poptics
 * Plugin URI:        https://aethonic.com/poptics/
 * Description:       Most advanced pop-up builder plugin.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.3
 * Author:            Aethonic
 * Author URI:        https://aethonic.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       poptics
 * Domain Path:       /languages

 * Poptics is a free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.

 * Poptics essential is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with Poptics. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package Poptics
 * @category Core
 * @author Aethonic
 * @version 1.0.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * The Main Plugin Requirements Checker
 *
 * @since 1.0.0
 */
final class Poptics {

    /**
     * Static Property To Hold Singleton Instance
     *
     * @var Poptics The Poptics Requirement Checker Instance
     */
    private static $instance;

    /**
     * Plugin Current Production Version
     *
     * @return string
     */
    public static function get_version() {
        return '1.0.0';
    }

    /**
     * Requirements Array
     *
     * @since 1.0.0
     * @var array
     */
    private $requirements = array(
        'php' => array(
            'name'    => 'PHP',
            'minimum' => '7.3',
            'exists'  => true,
            'met'     => false,
            'checked' => false,
            'current' => false,
        ),
        'wp'  => array(
            'name'    => 'WordPress',
            'minimum' => '5.2',
            'exists'  => true,
            'checked' => false,
            'met'     => false,
            'current' => false,
        ),
    );

    /**
     * Singleton Instance
     *
     * @since 1.0.0
     *
     * @return Poptics
     */
    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Setup Plugin Requirements
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function __construct() {
        // Always load translation.
        add_action( 'plugins_loaded', array( $this, 'load_text_domain' ) );

        // Initialize plugin functionalities or quit.
        $this->requirements_met() ? $this->initialize_modules() : $this->quit();
    }

    /**
     * Load Localization Files
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function load_text_domain() {
        $locale = apply_filters( 'plugin_locale', get_user_locale(), 'poptics' );

        unload_textdomain( 'poptics' );
        load_textdomain( 'poptics', WP_LANG_DIR . '/poptics/poptics-' . $locale . '.mo' );
        load_plugin_textdomain( 'poptics', false, self::get_plugin_dir() . 'languages/' );
    }

    /**
     * Initialize Plugin Modules.
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function initialize_modules() {
        require_once __DIR__ . '/autoloader.php';

        // Include the bootstrap file if not loaded.
        if ( !class_exists( 'Poptics\Bootstrap' ) ) {
            require_once self::get_plugin_dir() . 'bootstrap.php';
        }

        // Initialize the bootstrapper if exists.
        if ( class_exists( 'Poptics\Bootstrap' ) ) {

            // Initialize all modules through plugins_loaded.
            add_action( 'plugins_loaded', array( $this, 'init' ) );

            register_activation_hook( self::get_plugin_file(), array( $this, 'activate' ) );
            register_deactivation_hook( self::get_plugin_file(), array( $this, 'deactivate' ) );
        }
    }

    /**
     * Check If All Requirements Are Fulfilled.
     *
     * @since 1.0.0
     *
     * @return boolean
     */
    private function requirements_met() {
        $this->prepare_requirement_versions();

        $passed  = true;
        $to_meet = wp_list_pluck( $this->requirements, 'met' );

        foreach ( $to_meet as $met ) {
            if ( empty( $met ) ) {
                $passed = false;
                break;
            }
        }

        return $passed;
    }

    /**
     * Plugin Directory url
     *
     * @return string
     */
    public static function url( $file = '' ) {
        return esc_url( trailingslashit( plugins_url( '/', __FILE__ ) ) . $file );
    }

    /**
     * Plugin Directory Path
     *
     * @return string
     */
    public static function plugin_dir() {
        return trailingslashit( plugin_dir_path( __FILE__ ) );
    }

    /**
     * Requirement Version Prepare
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function prepare_requirement_versions() {
        foreach ( $this->requirements as $dependency => $config ) {
            switch ( $dependency ) {
            case 'php':
                $version = phpversion();
                break;
            case 'wp':
                $version = get_bloginfo( 'version' );
                break;
            default:
                $version = false;
            }

            if ( !empty( $version ) ) {
                $this->requirements[$dependency]['current'] = $version;
                $this->requirements[$dependency]['checked'] = true;
                $this->requirements[$dependency]['met']     = version_compare( $version, $config['minimum'], '>=' );
            }
        }
    }

    /**
     * Initialize everything.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        Poptics\Bootstrap::instantiate( self::get_plugin_file() );
    }

    /**
     * Called Only Once While Activation.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function activate() {
        // Check if multisite is enabled
        if ( is_multisite() ) {
            // Get all sites in the network
            $sites = get_sites();

            foreach ( $sites as $site ) {
                $this->install_necessary_tables_to_multisite( $site->blog_id );
            }
        } else {
            // If not multisite, install tables for the current site
            $this->install_necessary_tables_to_multisite( get_current_blog_id() );
        }
    }

    /**
     * Called Only Once While Deactivation
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function deactivate() {
        // Check if multisite is enabled
        if ( is_multisite() ) {
            // Get all sites in the network
            $sites = get_sites();

            foreach ( $sites as $site ) {
                $this->delete_custom_tables( $site->blog_id );
            }
        } else {
            // If not multisite, install tables for the current site
            $this->delete_custom_tables( get_current_blog_id() );
        }
    }

    /**
     * Quit Plugin Execution.
     *
     * @since 1.0.0
     *
     * @return void
     */
    private function quit() {
        add_action( 'admin_head', array( $this, 'show_plugin_requirements_not_met_notice' ) );
    }

    /**
     * Show Error Notice For Missing Requirements.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function show_plugin_requirements_not_met_notice() {
        printf( '<div>Minimum requirements for Poptics are not met. Please update requirements to continue.</div>' );
    }

    /**
     * Plugin Main File
     *
     * @return string
     */
    public static function get_plugin_file() {
        return __FILE__;
    }

    /**
     * Plugin Base Directory Path
     *
     * @return string
     */
    public static function get_plugin_dir() {
        return trailingslashit( plugin_dir_path( self::get_plugin_file() ) );
    }

    /**
     * Installs necessary tables for the plugin in a multisite environment.
     *
     * This function switches to the specified blog, creates the necessary tables,
     * and then switches back to the original blog.
     *
     * @param int $blog_id The ID of the blog to install the tables for.
     * @return void
     */
    public function install_necessary_tables_to_multisite( $blog_id ) {
        global $wpdb;

        if ( is_multisite() ) {
            // Switch to the new site
            switch_to_blog( $blog_id );
        }

        $is_already_exists = $this->do_tables_exist( $wpdb );

        if ( !$is_already_exists ) {
            // Define your SQL queries as an array of strings
            {
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
            }

            require_once ABSPATH . 'wp-admin/includes/upgrade.php';

            // Execute each query
            foreach ( $queries as $query ) {
                dbDelta( $query );
            }
        }

        if ( is_multisite() ) {
            // Switch back to the original site
            restore_current_blog();
        }
    }

    /**
     * Checks if the required tables exist in the database.
     *
     * @param int $blog_id The ID of the blog to check.
     * @param object $wpdb The WordPress database object.
     * @return bool True if all tables exist, false otherwise.
     */
    public function do_tables_exist( $wpdb ) {
        // Define the table names
        $tables = [
            $wpdb->prefix . 'campaign_visited_from_ip',
            $wpdb->prefix . 'poptics_analytics',
            $wpdb->prefix . 'poptics_analytics_meta',
            $wpdb->prefix . 'poptics_submissions',
            $wpdb->prefix . 'poptics_submissions_meta',
        ];

        // Suppress PHPCS warnings for direct database calls and lack of caching
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching -- Caching isn't necessary for this check
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery -- Suppress direct query warning

        // Check if each table exists
        $all_exist = true;
        foreach ( $tables as $table ) {
            $exists = $wpdb->get_var( $wpdb->prepare( "
                SELECT COUNT(*)
                FROM information_schema.tables
                WHERE table_schema = %s
                AND table_name = %s
            ", $wpdb->dbname, $table ) );

            if ( $exists == 0 ) {
                $all_exist = false;
                break;
            }
        }

        // phpcs:enable WordPress.DB.DirectDatabaseQuery.NoCaching
        // phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery

        return $all_exist;
    }

    /**
     * Deletes custom tables on site deletion.
     *
     * This function is triggered when a site is deleted and deletes the custom tables
     * associated with that site. It switches to the site being deleted, drops the
     * specified tables, and then restores the original blog context.
     *
     * @param int $site_id The ID of the site being deleted.
     * @return void
     */
    public function delete_custom_tables( $site_id ) {
        global $wpdb;

        // Switch to the site being deleted
        if ( is_multisite() ) {
            // Switch to the new site
            switch_to_blog( $site_id );
        }

        $settings               = poptics_get_settings();
        $keep_data_on_uninstall = true;
        if ( isset( $settings['data']['keep_data_on_uninstall'] ) && $settings['data']['keep_data_on_uninstall'] == false ) {
            $keep_data_on_uninstall = false;
        }

        if ( $keep_data_on_uninstall == false ) {
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

            // Disable foreign key checks
            $wpdb->query( "SET FOREIGN_KEY_CHECKS = 0;" );

            // Drop each table
            foreach ( $tables as $table ) {
                $wpdb->query( "DROP TABLE IF EXISTS `$table`;" );
            }

            $wpdb->query( "SET FOREIGN_KEY_CHECKS = 1;" );

            // phpcs:enable WordPress.DB.SchemaChange
            // phpcs:enable WordPress.DB.DirectDatabaseQuery.NoCaching
            // phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery
            // phpcs:enable WordPress.DB.PreparedSQL.NotPrepared

            // Delete campaigns
            poptics_delete_campaigns();
        }

        if ( is_multisite() ) {
            // Restore the original blog context
            restore_current_blog();
        }
    }

}

Poptics::get_instance();