<?php

namespace Poptics\Core\Analytics;

use DateTime;
use Exception;

/**
 * Class Analytics
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Analytics {
    /**
     * Analytics meta key column name
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $meta_key_column_name = 'meta_key';

    /**
     * Analytics meta key column name
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $meta_value_column_name = 'meta_value';

    /**
     * Analytics device meta key prefix
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $device_meta_prefix = 'device_';

    /**
     * Analytics browser meta key prefix
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $browser_meta_prefix = 'browser_';

    /**
     * Analytics country meta prefix
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $country_meta_prefix = 'country_';

    /**
     * Analytics page meta prefix
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $page_meta_prefix = 'page_';

    /**
     * Analytics country data to store in analytics table
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $data;

    /**
     * A private property that holds the global $wpdb object.
     *
     * @since 1.0.0
     *
     * This property is used to interact with the WordPress database.
     *
     * @var object
     */
    private $wpdb;

    /**
     * A private property that holds the database prefix.
     *
     * @since 1.0.0
     *
     * @var string
     */
    private $db_prefix;

    /**
     * Constructor for the class.
     *
     * @since 1.0.0
     *
     * @param $data The data to be used in the constructor.
     */
    public function __construct( $data = [] ) {
        global $wpdb;

        $this->wpdb      = $wpdb;
        $this->data      = $data;
        $this->db_prefix = $this->wpdb->prefix;
    }

    /**
     * Saves analytics information to the database.
     *
     * This function retrieves necessary data and updates or inserts analytics information
     * based on the campaign ID, current date, device type, browser name, and country name.
     *
     * @since 1.0.0
     *
     * @return bool Returns true if the analytics information is successfully saved, false otherwise.
     */
    public function save_info() {
        $campaign_id  = $this->data['campaign_id'];
        $is_converted = $this->data['is_converted'];
        $is_viewed    = $this->data['is_viewed'];
        $page_id      = $this->data['page_id'];
        $current_date = date( 'Y-m-d' );

        $meta_keys = [];
        if ( !empty( $this->data['device_type'] ) ) {
            $device_key = $this->get_device_key( $this->data['device_type'] );
            if ( !empty( $device_key ) ) {
                $meta_keys[] = $this->device_meta_prefix . $device_key;
            } else {
                $meta_keys[] = $this->device_meta_prefix . 'others';
            }
        }
        if ( !empty( $this->data['browser_name'] ) ) {
            $browser_key = $this->get_browser_key( $this->data['browser_name'] );
            if ( !empty( $browser_key ) ) {
                $meta_keys[] = $this->browser_meta_prefix . $browser_key;
            } else {
                $meta_keys[] = $this->browser_meta_prefix . 'others';
            }
        }
        if ( !empty( $this->data['country_name'] ) ) {
            $country_key = $this->get_country_key( $this->data['country_name'] );
            if ( !empty( $country_key ) ) {
                $meta_keys[] = $this->country_meta_prefix . $country_key;
            }
        }
        if ( !empty( $page_id ) ) {
            $meta_keys[] = $this->page_meta_prefix . $page_id;
        }

        try {
            $this->wpdb->query( 'START TRANSACTION' );

            $match_case = [
                'campaign_id' => $campaign_id,
                'date'        => $current_date,
            ];

            $result = reset( $this->get_analytics_info( $match_case ) );
            if ( $result ) {

                $analytics_id = $this->update_analytics( $result->id, $campaign_id, $current_date, $is_converted, $is_viewed );
            } else {
                $analytics_id = $this->insert_analytics( $campaign_id, $current_date, $is_converted, $is_viewed );
            }

            if ( $analytics_id ) {
                foreach ( $meta_keys as $meta_key ) {
                    $analytics_meta_update_result = $this->update_analytics_meta( $analytics_id, $campaign_id, $current_date, $meta_key, $is_converted, $is_viewed );
                    if ( $analytics_meta_update_result === false ) {
                        throw new Exception( 'Failed to update analytics meta.' );
                    }
                }
            } else {
                throw new Exception( 'Failed to update analytics info.' );
            }

            $this->wpdb->query( 'COMMIT' );
            return true;
        } catch ( Exception $e ) {
            $this->wpdb->query( 'ROLLBACK' );
            return false;
        }
    }

    /**
     * Tracks the IP address of a campaign visitor.
     *
     * @since 1.0.0
     *
     * @param int $campaign_id The ID of the campaign being visited.
     * @param string $ip_address The IP address of the visitor.
     * @return void
     */
    public function track_ip( $campaign_id, $ip_address ) {
        $is_record_already_exists = $this->check_if_campaign_already_visited_from_ip( $campaign_id, $ip_address );
        if ( !$is_record_already_exists ) {
            $this->wpdb->insert(
                "{$this->db_prefix}campaign_visited_from_ip",
                array(
                    'campaign_id' => $campaign_id,
                    'ip_address'  => $ip_address,
                ),
                array(
                    '%d',
                    '%s',
                )
            );
        }
    }

    /**
     * Checks if a campaign has already been visited from a specific IP address.
     *
     * @since 1.0.0
     *
     * @param int $campaign_id The ID of the campaign to check.
     * @param string $ip_address The IP address to check against.
     * @return bool True if the campaign has been visited from the IP address, false otherwise.
     */
    public function check_if_campaign_already_visited_from_ip( $campaign_id, $ip_address ) {
        $exists = $this->wpdb->get_var( $this->wpdb->prepare(
            "SELECT COUNT(*) FROM {$this->db_prefix}campaign_visited_from_ip WHERE campaign_id = %d AND ip_address = %s",
            $campaign_id,
            $ip_address
        ) );

        if ( $exists > 0 ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Retrieves the analytics overview for a card view.
     *
     * This function calculates the total number of visitors, views, conversions, and conversion rate
     * based on the provided campaign ID and date range. It retrieves the analytics information
     * from the database and performs the necessary calculations.
     *
     * @since 1.0.0
     *
     * @return array Returns an array containing the total number of visitors, views, conversions,
     *              and conversion rate.
     */
    public function get_analytics_overview_for_card_view() {
        $total_visitors        = 0;
        $total_views           = 0;
        $total_conversion      = 0;
        $total_conversion_rate = 0;

        $campaign_id = $this->data['campaign_id'];
        $date        = $this->data['date_range'];
        $match_case  = [];
        if ( !empty( $date ) ) {
            $match_case['date'] = $date;
        }
        if ( !empty( $campaign_id ) ) {
            $match_case['campaign_id'] = $campaign_id;
        }

        $results = $this->get_analytics_info( $match_case );

        if ( $results ) {
            foreach ( $results as $key => $result ) {
                if ( isset( $result->visitors ) ) {
                    $total_visitors = $total_visitors + $result->visitors;
                }
                if ( isset( $result->views ) ) {
                    $total_views = $total_views + $result->views;
                }
                if ( isset( $result->conversions ) ) {
                    $total_conversion = $total_conversion + $result->conversions;
                }
            }

            if ( $total_views > 0 && $total_conversion > 0 ) {
                $total_conversion_rate = number_format( ( ( $total_conversion * 100 ) / $total_views ), 2 );
            }
        }

        $data = [
            [
                'number' => $total_visitors,
                'title'  => __( "visitor", "poptics" ),
            ],
            [
                'number' => $total_views,
                'title'  => __( "views", "poptics" ),
            ],
            [
                'number' => $total_conversion,
                'title'  => __( "conversion", "poptics" ),
            ],
            [
                'number' => $total_conversion_rate,
                'title'  => __( "Conversion Rate", "poptics" ),
            ],
        ];

        return $data;
    }

    public function get_campaign_wise_analytics_overview( $campaign_id ) {
        $total_visitors        = 0;
        $total_views           = 0;
        $total_conversion      = 0;
        $total_conversion_rate = 0;

        $match_case = [];

        if ( !empty( $campaign_id ) ) {
            $match_case['campaign_id'] = $campaign_id;
        }

        $results = $this->get_analytics_info( $match_case );

        if ( $results ) {
            foreach ( $results as $key => $result ) {
                if ( isset( $result->visitors ) ) {
                    $total_visitors = $total_visitors + $result->visitors;
                }
                if ( isset( $result->views ) ) {
                    $total_views = $total_views + $result->views;
                }
                if ( isset( $result->conversions ) ) {
                    $total_conversion = $total_conversion + $result->conversions;
                }
            }

            if ( $total_views > 0 && $total_conversion > 0 ) {
                $total_conversion_rate = number_format( ( ( $total_conversion * 100 ) / $total_views ), 2 );
            }
        }

        $data = [
            'visitors'        => $total_visitors,
            'views'           => $total_views,
            'conversions'     => $total_conversion,
            'conversion_rate' => $total_conversion_rate,
        ];

        return $data;
    }

    /**
     * Retrieves the monthly analytics information of current year(always) for a given campaign ID and the current year.
     *
     * @since 1.0.0
     *
     * @return array Returns an array of results containing the name of the month, the sum of views,
     *              and the sum of conversions. The results are grouped by month and ordered by name in
     *              ascending order.
     */
    public function get_statistical_analytics_info() {
        $campaign_id = $this->data['campaign_id'];

        if ( !empty( $this->data['date_range'] ) ) {
            $date_range = explode( '~', $this->data['date_range'] );
        } else {
            // Get the start and end of the current month
            $start_of_current_month = date( 'Y-m-01' );
            $end_of_current_month   = date( 'Y-m-t' );

            // Set the date range to the start and end of the current month
            $date_range = [$start_of_current_month, $end_of_current_month];
        }

        $start_date = trim( $date_range[0] );
        $end_date   = trim( $date_range[1] );

        $args   = [];
        $args[] = $start_date;
        $args[] = $end_date;

        // Calculate the difference in months and years
        $start      = new DateTime( $start_date );
        $end        = new DateTime( $end_date );
        $month_diff = $start->diff( $end )->m + ( $start->diff( $end )->y * 12 );
        $year_diff  = $start->diff( $end )->y;

        $query = "SELECT DATE_FORMAT(date, '%M') AS period, ";

        // Determine the grouping level based on the date range
        if ( $year_diff > 0 ) {
            // If the date range spans multiple years, group by year
            $query = "SELECT YEAR(date) AS period, ";
        } elseif ( $month_diff > 0 ) {
            // If the date range spans multiple months within a single year, group by month
            $query = "SELECT DATE_FORMAT(date, '%M') AS period, ";
        } else {
            // If the date range spans a single month or day, group by date
            $query = "SELECT DATE(date) AS period, ";
        }

        // SQL query to sum views and conversions, grouped by month for the current year
        $query .= "
                SUM(views) AS impressions,
                SUM(conversions) AS conversion
            FROM {$this->db_prefix}poptics_analytics
            WHERE date BETWEEN %s AND %s
";

        if ( !empty( $campaign_id ) ) {
            $query .= " AND campaign_id = %d";
            $args[] = $campaign_id;
        }

        $query .= " GROUP BY period ORDER BY date ASC";

        // Prepare the query with the current year as a parameter
        $prepared_query = $this->wpdb->prepare( $query, $args );

        // Fetch the results
        $results = $this->wpdb->get_results( $prepared_query );

        return $results;
    }

    /**
     * Retrieves the device-based analytics information for a pie chart.
     *
     *
     * This function calculates the analytics information based on the provided campaign ID and date range.
     * It retrieves the analytics information from the database and performs the necessary calculations.
     *
     * @since 1.0.0
     *
     * @return array Returns an array containing the analytics information for the pie chart.
     *              The array contains three sub-arrays: 'pie_data_desktop', 'pie_data_mobile', and 'pie_data_others'.
     *              Each sub-array contains three elements: 'name', 'value', and 'fill'.
     *              The 'name' element represents the type of data, the 'value' element represents the value of the data,
     *              and the 'fill' element represents the color of the data.
     */
    public function get_device_based_analytics_info_for_pie_chart() {
        $campaign_id = $this->data['campaign_id'];
        $date        = $this->data['date_range'];
        $match_case  = [
            $this->meta_key_column_name => 'device_',
        ];

        if ( !empty( $date ) ) {
            $match_case['date'] = $date;
        }

        if ( !empty( $campaign_id ) ) {
            $match_case['campaign_id'] = $campaign_id;
        }

        $pie_data_desktop = [
            ['name' => __( "View", "poptics" ), 'value' => 0],
            ['name' => __( "Conversion", "poptics" ), 'value' => 0],
            ['name' => __( "Visitors", "poptics" ), 'value' => 0],
        ];

        $pie_data_mobile = [
            ['name' => __( "View", "poptics" ), 'value' => 0],
            ['name' => __( "Conversion", "poptics" ), 'value' => 0],
            ['name' => __( "Visitors", "poptics" ), 'value' => 0],
        ];

        $pie_data_others = [
            ['name' => __( "View", "poptics" ), 'value' => 0],
            ['name' => __( "Conversion", "poptics" ), 'value' => 0],
            ['name' => __( "Visitors", "poptics" ), 'value' => 0],
        ];

        $results = $this->get_analytics_meta( $match_case );

        if ( $results ) {
            foreach ( $results as $result ) {
                if ( $result->meta_key == 'device_desktop' ) {
                    $data                         = unserialize( $result->meta_value );
                    $pie_data_desktop[0]['value'] = $pie_data_desktop[0]['value'] + $data['views'];
                    $pie_data_desktop[1]['value'] = $pie_data_desktop[1]['value'] + $data['conversions'];
                    $pie_data_desktop[2]['value'] = $pie_data_desktop[2]['value'] + $data['visitors'];
                } elseif ( $result->meta_key == 'device_mobile' ) {
                    $data                        = unserialize( $result->meta_value );
                    $pie_data_mobile[0]['value'] = $pie_data_mobile[0]['value'] + $data['views'];
                    $pie_data_mobile[1]['value'] = $pie_data_mobile[1]['value'] + $data['conversions'];
                    $pie_data_mobile[2]['value'] = $pie_data_mobile[2]['value'] + $data['visitors'];
                } else {
                    $data                        = unserialize( $result->meta_value );
                    $pie_data_others[0]['value'] = $pie_data_others[0]['value'] + $data['views'];
                    $pie_data_others[1]['value'] = $pie_data_others[1]['value'] + $data['conversions'];
                    $pie_data_others[2]['value'] = $pie_data_others[2]['value'] + $data['visitors'];
                }
            }
        }

        $data = [
            'pie_data_desktop' => $pie_data_desktop,
            'pie_data_mobile'  => $pie_data_mobile,
            'pie_data_others'  => $pie_data_others,
        ];

        return $data;
    }

    /**
     * Retrieves all the analytics information for browsers.
     *
     * This function retrieves the analytics information for browsers based on the provided campaign ID and date range.
     * It queries the database to fetch the relevant data and performs necessary calculations.
     *
     * @since 1.0.0
     *
     * @return array Returns an array containing the analytics information for the browsers.
     *              The array contains an array of browser data, each containing the following elements:
     *              - 'browser': An array with the 'name' of the browser.
     *              - 'visitors': The total number of visitors for the browser.
     *              - 'views': The total number of views for the browser.
     *              - 'conversions': The total number of conversions for the browser.
     */
    public function get_all_browsers_analytics_info() {
        $campaign_id = $this->data['campaign_id'];
        $date        = $this->data['date_range'];
        $match_case  = [
            $this->meta_key_column_name => 'browser_',
        ];

        if ( !empty( $date ) ) {
            $match_case['date'] = $date;
        }

        if ( !empty( $campaign_id ) ) {
            $match_case['campaign_id'] = $campaign_id;
        }

        $data = [];

        $results   = $this->get_analytics_meta( $match_case );
        $temp_data = [];
        if ( $results ) {
            $allowed_browsers = poptics_analytics_browser_list();
            foreach ( $results as $result ) {
                $array_key = substr( $result->meta_key, strlen( "browser_" ) );
                $data      = unserialize( $result->meta_value );
                if ( array_key_exists( $array_key, $temp_data ) ) {
                    $temp_data[$array_key]['visitors']    = $temp_data[$array_key]['visitors'] + $data['visitors'];
                    $temp_data[$array_key]['views']       = $temp_data[$array_key]['views'] + $data['views'];
                    $temp_data[$array_key]['conversions'] = $temp_data[$array_key]['conversions'] + $data['conversions'];

                } else {
                    $temp_data[$array_key] = [
                        'item'        => [
                            'name' => $allowed_browsers[$array_key],
                        ],
                        'visitors'    => $data['visitors'],
                        'views'       => $data['views'],
                        'conversions' => $data['conversions'],
                    ];
                }
            }
        }

        $data = array_values( $temp_data );
        return $data;
    }

    /**
     * Retrieves all the analytics information for countries.
     *
     * @since 1.0.0
     *
     * @return array Returns an array containing the analytics information for countries.
     *              The array contains an array of country data, each containing the following elements:
     *              - 'country': An array with the 'name' of the country.
     *              - 'visitors': The total number of visitors for the country.
     *              - 'views': The total number of views for the country.
     *              - 'conversions': The total number of conversions for the country.
     */
    public function get_all_countries_analytics_info() {
        $campaign_id = $this->data['campaign_id'];
        $date        = $this->data['date_range'];
        $match_case  = [
            $this->meta_key_column_name => 'country_',
        ];

        if ( !empty( $date ) ) {
            $match_case['date'] = $date;
        }

        if ( !empty( $campaign_id ) ) {
            $match_case['campaign_id'] = $campaign_id;
        }

        $data = [];

        $results   = $this->get_analytics_meta( $match_case );
        $temp_data = [];
        if ( $results ) {
            $allowed_browsers = poptics_analytics_country_list();
            foreach ( $results as $result ) {
                $array_key = substr( $result->meta_key, strlen( "country_" ) );
                $data      = unserialize( $result->meta_value );
                if ( array_key_exists( $array_key, $temp_data ) ) {
                    $temp_data[$array_key]['visitors']    = $temp_data[$array_key]['visitors'] + $data['visitors'];
                    $temp_data[$array_key]['views']       = $temp_data[$array_key]['views'] + $data['views'];
                    $temp_data[$array_key]['conversions'] = $temp_data[$array_key]['conversions'] + $data['conversions'];

                } else {
                    $temp_data[$array_key] = [
                        'item'        => [
                            'name' => $allowed_browsers[$array_key],
                        ],
                        'visitors'    => $data['visitors'],
                        'views'       => $data['views'],
                        'conversions' => $data['conversions'],
                    ];
                }
            }
        }

        $data = array_values( $temp_data );
        return $data;
    }

    /**
     * Retrieves all the analytics information for pages.
     *
     * This function retrieves the analytics information for pages based on the provided campaign ID and date range.
     * It queries the database to fetch the relevant data and performs necessary calculations.
     *
     * @since 1.0.0
     *
     * @return array Returns an array containing the analytics information for the pages.
     *              The array contains an array of page data, each containing the following elements:
     *              - 'page': An array with the 'name' of the page.
     *              - 'visitors': The total number of visitors for the page.
     *              - 'views': The total number of views for the page.
     *              - 'conversions': The total number of conversions for the page.
     */
    public function get_all_pages_analytics_info() {
        $campaign_id = $this->data['campaign_id'];
        $date        = $this->data['date_range'];
        $match_case  = [
            $this->meta_key_column_name => 'page_',
        ];

        if ( !empty( $date ) ) {
            $match_case['date'] = $date;
        }

        if ( !empty( $campaign_id ) ) {
            $match_case['campaign_id'] = $campaign_id;
        }

        $data = [];

        $results   = $this->get_analytics_meta( $match_case );
        $temp_data = [];

        if ( $results ) {
            foreach ( $results as $result ) {
                $array_key = substr( $result->meta_key, strlen( "page_" ) );
                $data      = unserialize( $result->meta_value );
                if ( array_key_exists( $array_key, $temp_data ) ) {
                    $temp_data[$array_key]['visitors']    = $temp_data[$array_key]['visitors'] + $data['visitors'];
                    $temp_data[$array_key]['views']       = $temp_data[$array_key]['views'] + $data['views'];
                    $temp_data[$array_key]['conversions'] = $temp_data[$array_key]['conversions'] + $data['conversions'];

                } else {
                    $temp_data[$array_key] = [
                        'item'        => [
                            'name' => get_the_title( $array_key ),
                        ],
                        'visitors'    => $data['visitors'],
                        'views'       => $data['views'],
                        'conversions' => $data['conversions'],
                    ];
                }
            }

            $data = array_values( $temp_data );
        }
        return $data;
    }

    /**
     * Retrieves the key associated with a specific device name.
     *
     * @since 1.0.0
     *
     * @param string $device_name The name of the device to retrieve the key for.
     * @return The key of the device if found, otherwise false.
     */
    public function get_device_key( $device_name ) {
        $devices    = poptics_analytics_device_list();
        $device_key = array_search( ucwords( $device_name ), $devices );
        return $device_key;
    }

    /**
     * Retrieves the key associated with a specific browser name.
     *
     * @since 1.0.0
     *
     * @param string $browser_name The name of the browser to retrieve the key for.
     * @return The key of the browser if found, otherwise false.
     */
    public function get_browser_key( $browser_name ) {
        $browsers    = poptics_analytics_browser_list();
        $browser_key = array_search( ucwords( $browser_name ), $browsers );
        return $browser_key;
    }

    /**
     * Retrieves the key associated with a specific country name.
     *
     * @since 1.0.0
     *
     * @param string $country_name The name of the country to retrieve the key for.
     * @return The key of the country if found, otherwise false.
     */
    public function get_country_key( $country_name ) {
        $countries   = poptics_analytics_country_list();
        $country_key = array_search( ucwords( $country_name ), $countries );
        return $country_key;
    }

    /**
     * Inserts analytics data into the database.
     *
     * @since 1.0.0
     *
     * @param int $campaign_id The ID of the campaign.
     * @param string $date The date of the analytics data.
     * @param int $is_converted Flag indicating if the data is converted.
     * @return int|bool The ID of the inserted row if successful, otherwise false.
     */
    public function insert_analytics( $campaign_id, $date, $is_converted, $is_viewed ) {

        $insert_result = $this->wpdb->insert(
            "{$this->db_prefix}poptics_analytics",
            array(
                'campaign_id' => $campaign_id,
                'date'        => $date,
                'visitors'    => 1,
                'views'       => $is_viewed,
                'conversions' => $is_converted,
            ),
            array(
                '%d',
                '%s',
                '%d',
            )
        );
        if ( $insert_result ) {
            return $this->wpdb->insert_id;
        }
        return $insert_result;
    }

    /**
     * Updates the analytics data in the database.
     *
     * @since 1.0.0
     *
     * @param mixed $analytics_id The ID of the analytics.
     * @param mixed $campaign_id The ID of the campaign.
     * @param string $date The date of the analytics.
     * @param mixed $is_converted The flag indicating if the data is converted.
     * @return mixed The ID of the updated row if successful, otherwise false.
     */
    public function update_analytics( $analytics_id, $campaign_id, $date, $is_converted, $is_viewed ) {
        $update_result = $this->wpdb->query(
            $this->wpdb->prepare(
                "UPDATE {$this->db_prefix}poptics_analytics
                 SET conversions = conversions + %d, views = views + %d, visitors = visitors + 1
                 WHERE campaign_id = %d AND date = %s",
                $is_converted, // Value to add to conversions
                $is_viewed, // Value to add to views
                $campaign_id,
                $date
            )
        );

        if ( $update_result ) {
            return $analytics_id;
        } else {
            return false;
        }
    }

    /**
     * Retrieves analytics information based on the provided match case.
     *
     * @since 1.0.0
     *
     * @param array $match_case An array containing campaign_id and date.
     * @return mixed Returns the result of the database query.
     */
    public function get_analytics_info( $match_case = [] ) {
        $campaign_id = isset( $match_case['campaign_id'] ) ? $match_case['campaign_id'] : "";
        $date        = isset( $match_case['date'] ) ? $match_case['date'] : "";

        $date_range = explode( '~', $date );
        $start_date = '';
        $end_date   = '';

        if ( sizeof( $date_range ) == 1 ) {
            $start_date = trim( $date );
            $end_date   = trim( $date );
        } else {
            $start_date = trim( $date_range[0] );
            $end_date   = trim( $date_range[1] );
        }

        $query = "SELECT * FROM {$this->db_prefix}poptics_analytics WHERE 1 = 1";
        $args  = [];

        if ( !empty( $campaign_id ) ) {
            $query .= " AND campaign_id = %d";
            $args[] = $campaign_id;
        }

        if ( !empty( $start_date ) && !empty( $end_date ) ) {
            $query .= " AND date BETWEEN %s AND %s";
            $args[] = $start_date;
            $args[] = $end_date;
        }

        $prepared_query = $this->wpdb->prepare( $query, $args );

        $result = $this->wpdb->get_results( $prepared_query );

        return $result;
    }

    /**
     * Retrieves analytics information grouped by campaign based on the provided match case.
     *
     * @since 1.0.0
     *
     * @param array $match_case An array containing campaign_id, date, and limit.
     * @return mixed Returns the result of the database query.
     */
    function get_analytics_info_group_by_campaign( $match_case = [] ) {
        $campaign_id  = isset( $match_case['campaign_id'] ) ? $match_case['campaign_id'] : "";
        $campaign_ids = isset( $match_case['campaign_ids'] ) ? $match_case['campaign_ids'] : "";
        $date         = isset( $match_case['date'] ) ? $match_case['date'] : "";
        $limit        = isset( $match_case['limit'] ) ? $match_case['limit'] : "";

        $date_range = explode( '~', $date );
        $start_date = '';
        $end_date   = '';

        if ( sizeof( $date_range ) == 1 ) {
            $start_date = trim( $date );
            $end_date   = trim( $date );
        } else {
            $start_date = trim( $date_range[0] );
            $end_date   = trim( $date_range[1] );
        }

        // Start building the SQL query
        $query = "SELECT campaign_id, SUM(views) as total_views, SUM(visitors) as total_visitors, SUM(conversions) as total_conversions
                  FROM {$this->db_prefix}poptics_analytics WHERE 1 = 1";
        $args = [];

        if ( !empty( $campaign_id ) ) {
            $query .= " AND campaign_id = %d";
            $args[] = $campaign_id;
        }

        if ( !empty( $start_date ) && !empty( $end_date ) ) {
            $query .= " AND date BETWEEN %s AND %s";
            $args[] = $start_date;
            $args[] = $end_date;
        }

        if ( !empty( $campaign_ids ) ) {
            $placeholders = implode( ',', array_fill( 0, count( $campaign_ids ), '%d' ) );
            $query .= " AND campaign_id IN ($placeholders)";
            $args = array_merge( $args, $campaign_ids );
        }

        // Group by campaign_id
        $query .= " GROUP BY campaign_id";

        // Order by total_visitors in descending order
        $query .= " ORDER BY total_views DESC";
        if ( !empty( $limit ) ) {
            $query .= " LIMIT " . $limit;
        }

        // Execute the query
        $prepared_query = $this->wpdb->prepare( $query, $args );
        $results        = $this->wpdb->get_results( $prepared_query );

        // Return the results
        return $results;
    }

    /**
     * Updates the analytics meta data in the database.
     *
     * @since 1.0.0
     *
     * @param int $analytics_id The ID of the analytics.
     * @param int $campaign_id The ID of the campaign.
     * @param string $date The date of the analytics.
     * @param string $meta_key The key of the meta data.
     * @param int $is_converted Flag indicating if the data is converted.
     * @return int|bool The ID of the updated row if successful, otherwise false.
     */
    public function update_analytics_meta( $analytics_id, $campaign_id, $date, $meta_key, $is_converted, $is_viewed ) {
        $match_case = [
            'analytics_id'              => $analytics_id,
            $this->meta_key_column_name => $meta_key,
        ];
        $result = reset( $this->get_analytics_meta( $match_case ) );

        if ( $result ) {
            // If it exists, update the views and conversions counts
            $meta_value = maybe_unserialize( $result->meta_value ); // Unserialize existing meta_value
            if ( !is_array( $meta_value ) ) {
                $meta_value = array( 'visitors' => 0, 'views' => 0, 'conversions' => 0 );
            }

            // Increment visitors
            $meta_value['visitors'] = $meta_value['visitors'] + 1;

            // Increment views
            $meta_value['views'] = (int) $meta_value['views'] + (int) $is_viewed;

            // Increment conversions if is_converted is 1
            $meta_value['conversions'] = (int) $meta_value['conversions'] + (int) $is_converted;

            // Serialize updated meta_value
            $updated_meta_value = serialize( $meta_value );

            // Update the row
            $update_result = $this->wpdb->update(
                "{$this->db_prefix}poptics_analytics_meta",
                array( $this->meta_value_column_name => $updated_meta_value ),
                array( 'id' => $result->id ),
                array( '%s' ),
                array( '%d' )
            );

            return $update_result;
        } else {
            $insert_result = $this->wpdb->insert(
                "{$this->db_prefix}poptics_analytics_meta",
                array(
                    'analytics_id'                => $analytics_id,
                    'campaign_id'                 => $campaign_id,
                    'date'                        => $date,
                    $this->meta_key_column_name   => $meta_key,
                    $this->meta_value_column_name => serialize( array( 'visitors' => 1, 'views' => $is_viewed, 'conversions' => $is_converted ) ),
                ),
                array( '%d', '%d', '%s', '%s', '%s', '%s' )
            );

            return $insert_result;
        }
    }

    /**
     * Retrieves analytics meta data based on the provided match case.
     *
     * @since 1.0.0
     *
     * @param array $match_case An array containing analytics_id, campaign_id, date, and meta_key.
     * @return object|null The retrieved analytics meta data or null if not found.
     */
    public function get_analytics_meta( $match_case ) {

        $analytics_id = isset( $match_case['analytics_id'] ) ? $match_case['analytics_id'] : "";
        $campaign_id  = isset( $match_case['campaign_id'] ) ? $match_case['campaign_id'] : "";
        $date         = isset( $match_case['date'] ) ? $match_case['date'] : "";
        $meta_key     = isset( $match_case['meta_key'] ) ? $match_case['meta_key'] : "";

        $date_range = explode( '~', $date );
        $start_date = '';
        $end_date   = '';

        if ( sizeof( $date_range ) == 1 ) {
            $start_date = trim( $date );
            $end_date   = trim( $date );
        } else {
            $start_date = trim( $date_range[0] );
            $end_date   = trim( $date_range[1] );
        }

        $query = "SELECT * FROM {$this->db_prefix}poptics_analytics_meta WHERE 1 = 1";
        $args  = [];

        if ( !empty( $analytics_id ) ) {
            $query .= " AND analytics_id = %d";
            $args[] = $analytics_id;
        }

        if ( !empty( $campaign_id ) ) {
            $query .= " AND campaign_id = %d";
            $args[] = $campaign_id;
        }

        if ( !empty( $meta_key ) ) {
            $query .= " AND meta_key LIKE %s";
            $args[] = '%' . $meta_key . '%';
        }

        if ( !empty( $start_date ) && !empty( $end_date ) ) {
            $query .= " AND date BETWEEN %s AND %s";
            $args[] = $start_date;
            $args[] = $end_date;
        }

        $prepared_query = $this->wpdb->prepare( $query, $args );
        $result         = $this->wpdb->get_results( $prepared_query );
        return $result;
    }
}