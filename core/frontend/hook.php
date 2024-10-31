<?php

namespace Poptics\Core\Frontend;

use DateTime;
use DateTimeZone;
use Poptics\Core\Campaign\Api_Campaign;
use Poptics\Core\Campaign\Campaign;
use Poptics\Utils\Singleton;

/**
 * Frontend hook class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Hook {
    use Singleton;

    /**
     * Initializing frontend hook
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        add_action( 'wp_footer', [$this, 'add_footer_content'] );
        add_action( 'wp_head', [$this, 'add_header_content'] );
    }

    /**
     * Add content to the footer
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function add_footer_content() {
        wp_enqueue_script( 'poptics-frontend-script' );
        wp_enqueue_script( 'poptics-guten-block' );

        $page_info = json_encode( [
            "id" => get_the_ID(),
        ] );

        if ( function_exists( 'is_shop' ) && is_shop() ) {
            $page_info = json_encode( [
                "id" => wc_get_page_id( 'shop' ),
            ] );
        }

        $localize_obj = array(
            'site_url' => site_url(),
        );

        $localize_obj = apply_filters( 'poptics_frontend_localize_data', $localize_obj );

        wp_localize_script( 'poptics-frontend-script', 'poptics', $localize_obj );

        $api_campaign     = new Api_Campaign();
        $active_campaigns = Campaign::all( [
            'posts_per_page' => -1,
            'paged'          => -1,
            'post_status'    => ['active', 'scheduled'],
        ] );

        $items = [];

        foreach ( $active_campaigns['items'] as $item ) {
            $single_campaign = $api_campaign->prepare_item( $item->ID );
            if ( !empty( $single_campaign['controls']['schedule']['fixed'] ) ) {
                $is_current_time_in_schedule = $this->is_current_time_in_schedule( $single_campaign['controls']['schedule'] );

                if ( $is_current_time_in_schedule ) {
                    $items[] = $api_campaign->prepare_item( $item->ID );
                }
            } else {
                $items[] = $api_campaign->prepare_item( $item->ID );
            }
        }

        $jsonString   = json_encode( $items );
        $base64String = base64_encode( $jsonString );
        ?>

<div id="poptics-popup-wrapper" page-info='<?php echo esc_attr( $page_info ); ?>'>
    <div data-campaigns="<?php echo esc_attr( $base64String ); ?>" id="active-campaigns"></div>
</div>
<?php
}

    /**
     * Enqueues the frontend styles for the Poptics plugin.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function add_header_content() {
        wp_enqueue_style( 'poptics-frontend' );
    }

    /**
     * Checks if the current time is within any of the duration ranges in a schedule.
     *
     * @param array $schedule The schedule to check, with keys 'fixed' and 'recurring'.
     *                         The 'fixed' key points to an array of arrays, each containing
     *                         the keys 'timezone', 'duration', and 'days'. The 'duration' key
     *                         points to an array of strings, each representing a start and end
     *                         time in the format 'YYYY-MM-DD HH:MM:SS'.
     *
     * @return bool True if the current time is within any of the duration ranges, false otherwise.
     */

    function is_current_time_in_schedule( $schedule ) {
        foreach ( $schedule['fixed'] as $schedule_entry ) {
            // Get the timezone of the schedule
            $timezone     = new DateTimeZone( $schedule_entry['timezone'] );
            $current_time = new DateTime( 'now', $timezone );

            // Loop through the duration ranges (they are pairs of start and end times)
            $durations = $schedule_entry['duration'];

            for ( $i = 0; $i < count( $durations ); $i += 2 ) {
                // Convert the start and end time of each duration to DateTime objects
                $start_time = new DateTime( $durations[$i], $timezone );
                $end_time   = new DateTime( $durations[$i + 1], $timezone );

                // Check if current time is within the duration
                if ( $current_time >= $start_time && $current_time <= $end_time ) {
                    return true; // Current time is within the duration
                }
            }
        }

        // If no duration includes the current time, return false
        return false;
    }

}