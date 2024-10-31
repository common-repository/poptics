<?php

namespace Poptics\Core\Analytics;

use Poptics\Utils\Singleton;

/**
 * Analytics hook class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Hook {
    use Singleton;

    /**
     * Initializing analytics hook
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        add_action( 'poptics_campaign_deleted', array( $this, 'delete_campaign_related_analytics_info' ) );
    }

    /**
     * Deletes analytics data related to a campaign.
     *
     * This function deletes all rows from the `campaign_visited_from_ip` and
     * `poptics_analytics` tables in which the `campaign_id` matches the given
     * `$campaign_id`.
     *
     * @since 1.0.0
     *
     * @param int $campaign_id The ID of the campaign whose analytics data should be deleted.
     * @return void
     */
    public function delete_campaign_related_analytics_info( $campaign_id ) {
        global $wpdb;

        $table_campaign_visited_from_ip = $wpdb->prefix . 'campaign_visited_from_ip';
        $table_poptics_analytics        = $wpdb->prefix . 'poptics_analytics';

        // Suppress PHPCS warnings for direct database calls and lack of caching
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery

        // Delete campaign-related data from both tables
        $wpdb->delete( $table_campaign_visited_from_ip, array( 'campaign_id' => $campaign_id ) );
        $wpdb->delete( $table_poptics_analytics, array( 'campaign_id' => $campaign_id ) );

        // phpcs:enable WordPress.DB.DirectDatabaseQuery.NoCaching
        // phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery
    }
}