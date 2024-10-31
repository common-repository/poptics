<?php

namespace Poptics\Core\Submissions;

use Poptics\Utils\Singleton;

/**
 * Submissions hook class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Hook {
    use Singleton;

    /**
     * Initializing submissions hook
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        add_action( 'poptics_campaign_deleted', array( $this, 'delete_campaign_related_submission_info' ) );
    }

    /**
     * Deletes submission data related to a campaign.
     *
     * This function deletes all rows from the `campaign_visited_from_ip` and
     * `poptics_submissions` tables in which the `campaign_id` matches the given
     * `$campaign_id`.
     *
     * @since 1.0.0
     *
     * @param int $campaign_id The ID of the campaign whose submission data should be deleted.
     * @return void
     */
    public function delete_campaign_related_submission_info( $campaign_id ) {
        global $wpdb;

        $table_poptics_submissions = $wpdb->prefix . 'poptics_submissions';

        // Suppress PHPCS warnings for direct database calls and lack of caching
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
        // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery

        // Delete campaign-related data from table
        $wpdb->delete( $table_poptics_submissions, array( 'campaign_id' => $campaign_id ) );

        // phpcs:enable WordPress.DB.DirectDatabaseQuery.NoCaching
        // phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery
    }
}