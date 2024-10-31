<?php
/**
 * Class Submission
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
namespace Poptics\Core\Submissions;

use Exception;

class Submission {
    /**
     * Submission meta key column name
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $meta_key_column_name = 'meta_key';

    /**
     * Submission meta key column name
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $meta_value_column_name = 'meta_value';

    /**
     * Submission data
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $data;

    /**
     * A private property that holds the global $wpdb object.
     *
     * This property is used to interact with the WordPress database.
     *
     * @since 1.0.0
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
     * Save the submission to the database.
     *
     * This method first inserts a new submission into the database and retrieves the ID.
     * If the submission has any other details, it will then insert those into the submissions meta table
     * with the submission ID.
     *
     * @since 1.0.0
     *
     * @return bool True if the submission was saved successfully.
     */
    public function save() {
        $submission_id = $this->insert_submission();
        if ( $submission_id && !empty( $this->data['other_details'] ) ) {
            $this->insert_submission_meta( $submission_id );
        }

        return true;
    }

    /**
     * Retrieves a single submission based on the submission ID.
     *
     * @since 1.0.0
     *
     * @return array|false The submission details or false on failure.
     */
    public function get_single_submission_details() {
        try {
            $submission_id = $this->data['submission_id'];

            $match_case = [
                'submission_id' => $submission_id,
                'is_single'     => true,
            ];

            $submission = $this->get_submission_basic_details( $match_case );
            return current( $submission );
        } catch ( Exception $ex ) {
            return false;
        }
    }

    /**
     * Retrieves a list of submissions based on the given match case.
     *
     * @since 1.0.0
     *
     * @param array $match_case An associative array of match criteria. The following keys are supported:
     *
     *  - submission_id: The ID of the submission to retrieve.
     *  - campaign_id: The ID of the campaign to retrieve submissions for.
     *  - location: The location of the submission to retrieve.
     *  - device: The device of the submission to retrieve.
     *  - browser: The browser of the submission to retrieve.
     *  - status: The status of the submission to retrieve.
     *  - search_key: A search string to filter the results by. The search will be performed on the email and meta value fields.
     *  - paged: The page number to retrieve. (Default is 1)
     *  - per_page: The number of items to retrieve per page. (Default is 10)
     *
     * @return array A list of submission details.
     */
    public function get_all_submissions() {
        $match_case = [];

        if ( isset( $this->data['campaign_id'] ) ) {
            $match_case['campaign_id'] = $this->data['campaign_id'];
        }

        if ( isset( $this->data['location'] ) ) {
            $match_case['location'] = $this->data['location'];
        }

        if ( isset( $this->data['device'] ) ) {
            $match_case['device'] = $this->data['device'];
        }

        if ( isset( $this->data['browser'] ) ) {
            $match_case['browser'] = $this->data['browser'];
        }

        if ( isset( $this->data['status'] ) ) {
            $match_case['status'] = $this->data['status'];
        }

        if ( isset( $this->data['search_key'] ) ) {
            $match_case['search_key'] = $this->data['search_key'];
        }

        if ( isset( $this->data['paged'] ) ) {
            $match_case['paged'] = $this->data['paged'];
        }

        if ( isset( $this->data['per_page'] ) ) {
            $match_case['per_page'] = $this->data['per_page'];
        }

        try {
            $submissions = $this->get_submission_basic_details( $match_case );

            return $submissions;
        } catch ( \Exception $ex ) {
            return false;
        }

    }

    /**
     * Retrieves a list of submissions based on the given match case.
     *
     * @since 1.0.0
     *
     * @param array $match_case An associative array of match criteria. The following keys are supported:
     *
     *  - submission_id: The ID of the submission to retrieve.
     *  - campaign_id: The ID of the campaign to retrieve submissions for.
     *  - location: The location of the submission to retrieve.
     *  - device: The device of the submission to retrieve.
     *  - browser: The browser of the submission to retrieve.
     *  - status: The status of the submission to retrieve.
     *  - search_key: A search string to filter the results by. The search will be performed on the email and meta value fields.
     *
     * @return array A list of submission details.
     */
    public function get_submission_basic_details( $match_case ) {
        $submission_id = isset( $match_case['submission_id'] ) ? $match_case['submission_id'] : "";
        $campaign_id   = isset( $match_case['campaign_id'] ) ? $match_case['campaign_id'] : "";
        $location      = isset( $match_case['location'] ) ? $match_case['location'] : "";
        $device        = isset( $match_case['device'] ) ? $match_case['device'] : "";
        $browser       = isset( $match_case['browser'] ) ? $match_case['browser'] : "";
        $status        = isset( $match_case['status'] ) ? $match_case['status'] : "";
        $search_key    = isset( $match_case['search_key'] ) ? $match_case['search_key'] : "";
        $is_single     = isset( $match_case['is_single'] ) ? $match_case['is_single'] : false;

        $query = "SELECT
                    submission.id,
                    submission.email,
                    submission.browser,
                    submission.location,
                    submission.device,
                    submission.campaign_id,
                    submission.status,
                    GROUP_CONCAT(CONCAT_WS(':', submission_meta.meta_key, submission_meta.meta_value) SEPARATOR ',') AS meta_data
                FROM
                    {$this->wpdb->prefix}poptics_submissions AS submission
                LEFT JOIN
                    {$this->wpdb->prefix}poptics_submissions_meta AS submission_meta
                ON
                    submission.id = submission_meta.submission_id
                WHERE
                    1 = 1";

        // Query for getting the total number of submissions
        $count_query = "SELECT COUNT(DISTINCT submission.id) as total_submissions
                        FROM {$this->wpdb->prefix}poptics_submissions AS submission
                        LEFT JOIN {$this->wpdb->prefix}poptics_submissions_meta AS submission_meta
                        ON submission.id = submission_meta.submission_id
                        WHERE 1 = 1";

        $args       = [];
        $count_args = [];

        if ( !empty( $submission_id ) ) {
            $query .= " AND submission.id = %d";
            $count_query .= " AND submission.id = %d";
            $args[]       = $submission_id;
            $count_args[] = $submission_id;
        }

        if ( !empty( $campaign_id ) ) {
            $query .= " AND submission.campaign_id = %d";
            $count_query .= " AND submission.campaign_id = %d";
            $args[]       = $campaign_id;
            $count_args[] = $campaign_id;
        }

        if ( !empty( $location ) ) {
            $query .= " AND submission.location = %s";
            $count_query .= " AND submission.location = %s";
            $args[]       = $location;
            $count_args[] = $location;
        }

        if ( !empty( $device ) ) {
            $query .= " AND submission.device = %s";
            $count_query .= " AND submission.device = %s";
            $args[]       = $device;
            $count_args[] = $device;
        }

        if ( !empty( $browser ) ) {
            $query .= " AND submission.browser = %s";
            $count_query .= " AND submission.browser = %s";
            $args[]       = $browser;
            $count_args[] = $browser;
        }

        if ( !empty( $status ) ) {
            $query .= " AND submission.status = %s";
            $count_query .= " AND submission.status = %s";
            $args[]       = $status;
            $count_args[] = $status;
        }

        if ( !empty( $search_key ) ) {
            $query .= " AND (submission.email LIKE %s OR submission_meta.meta_value LIKE %s)";
            $count_query .= " AND (submission.email LIKE %s OR submission_meta.meta_value LIKE %s)";
            $args[]       = '%' . $search_key . '%';
            $count_args[] = '%' . $search_key . '%';
        }

        $query .= " GROUP BY submission.id";
        $query .= " ORDER BY submission.id DESC";

        if ( !empty( $match_case['paged'] ) && !empty( $match_case['per_page'] ) ) {
            // Pagination parameters
            $page     = $match_case['paged'];
            $per_page = $match_case['per_page'];

            // Calculate offset
            $offset = ( $page - 1 ) * $per_page;

            $query .= " LIMIT %d OFFSET %d";
            $args[] = $per_page;
            $args[] = $offset;
        }

        // Prepare and execute the total count query (no pagination)
        $prepared_count_query     = $this->wpdb->prepare( $count_query, $count_args );
        $total_submissions_result = $this->wpdb->get_results( $prepared_count_query );
        $prepared_query           = $this->wpdb->prepare( $query, $args );
        $results                  = $this->wpdb->get_results( $prepared_query );

        $submission_details = [];

        foreach ( $results as $index => $result ) {
            $details                  = [];
            $details['id']            = $result->id;
            $details['email']         = $result->email;
            $details['location']      = $result->location;
            $details['device']        = $result->device;
            $details['browser']       = $result->browser;
            $details['campaign_id']   = $result->campaign_id;
            $details['campaign_name'] = get_post_field( 'post_title', $result->campaign_id );
            $details['status']        = $result->status;

            $details['other_details'] = [];

            if ( !empty( $result->meta_data ) ) {
                $meta_pairs = explode( ',', $result->meta_data );
                foreach ( $meta_pairs as $pair ) {
                    $meta_pairs_array = explode( ':', $pair );
                    $meta_key         = $meta_pairs_array[0];
                    $meta_value       = $meta_pairs_array[1];

                    $details['other_details'][$meta_key] = $meta_value;
                }
            }

            $submission_details[] = $details;
        }

        if ( !$is_single ) {
            return [
                'total'        => !empty( $total_submissions_result[0]->total_submissions ) ? $total_submissions_result[0]->total_submissions : 0,
                'status_count' => $this->get_submission_status_count(),
                'details'      => $submission_details,
            ];
        } else {
            return $submission_details;
        }

    }

    /**
     * Inserts a new submission into the database and retrieves the ID.
     *
     * @since 1.0.0
     *
     * @return int|false The submission ID on success, false on failure.
     */
    public function insert_submission() {
        $insert_result = $this->wpdb->insert( $this->db_prefix . 'poptics_submissions', array(
            'campaign_id' => $this->data['campaign_id'],
            'email'       => $this->data['email'],
            'browser'     => $this->data['browser'],
            'device'      => $this->data['device'],
            'location'    => $this->data['location'],
        ), array(
            '%d',
            '%s',
            '%s',
            '%s',
            '%s',
        ) );

        if ( $insert_result ) {
            return $this->wpdb->insert_id;
        }
        return $insert_result;
    }

    /**
     * Inserts additional submission metadata into the database.
     *
     * @since 1.0.0
     *
     * @param int $submission_id The ID of the submission to store the metadata for.
     *
     * @return void
     */
    public function insert_submission_meta( $submission_id ) {
        $other_details = (array) $this->data['other_details'];
        foreach ( $other_details as $meta_key => $meta_value ) {
            $this->wpdb->insert(
                '' . $this->db_prefix . 'poptics_submissions_meta',
                [
                    'submission_id'               => $submission_id,
                    $this->meta_key_column_name   => str_replace( ' ', '_', strtolower( $meta_key ) ),
                    $this->meta_value_column_name => $meta_value,
                ],
                [
                    '%d',
                    '%s',
                    '%s',
                ]
            );
        }
    }

    /**
     * Checks if a submission already exists based on the provided match case.
     *
     * @since 1.0.0
     *
     * @param array $match_case An array containing campaign_id, email, status, and submission_id.
     * @return bool True if the submission already exists, false otherwise.
     */
    public function check_if_submission_already_exists( $match_case ) {
        $campaign_id   = isset( $match_case['campaign_id'] ) ? $match_case['campaign_id'] : "";
        $email         = isset( $match_case['email'] ) ? $match_case['email'] : "";
        $status        = isset( $match_case['status'] ) ? $match_case['status'] : "";
        $submission_id = isset( $match_case['submission_id'] ) ? $match_case['submission_id'] : "";

        // Start building the SQL query
        $query = "SELECT COUNT(*) FROM {$this->db_prefix}poptics_submissions WHERE 1 = 1";
        $args  = [];

        if ( !empty( $campaign_id ) ) {
            $query .= " AND campaign_id = %d";
            $args[] = $campaign_id;
        }

        if ( !empty( $email ) ) {
            $query .= " AND email = %s";
            $args[] = $email;
        }

        if ( !empty( $status ) ) {
            $query .= " AND status = %s";
            $args[] = $status;
        }

        if ( !empty( $submission_id ) ) {
            $query .= " AND id = %d";
            $args[] = $submission_id;
        }

        // Prepare the query
        $prepared_query = $this->wpdb->prepare( $query, $args );

        // Execute the query
        $exists = $this->wpdb->get_var( $prepared_query );

        if ( $exists > 0 ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Updates the status of a submission in the database.
     *
     * Performs the update only if the status is different than the current status.
     *
     * @since 1.0.0
     *
     * @return bool True if the submission was updated successfully, false otherwise.
     */
    public function update_submission_status() {
        $submission_id = $this->data['submission_id'];
        $status        = $this->data['status'];

        // Prepare the table name with the proper prefix
        $table_name = $this->db_prefix . 'poptics_submissions';

        // Perform the update only if the status is different
        $result = $this->wpdb->query(
            $this->wpdb->prepare(
                "UPDATE $table_name SET status = %s WHERE id = %d",
                $status, $submission_id
            )
        );

        if ( $result === false ) {
            // Check for errors
            return false;
        } elseif ( $result === 0 ) {
            // No rows were affected (status was already the same)
            return false;
        } else {
            // Update was successful, and a row was affected
            return true;
        }
    }

    /**
     * Deletes a submission from the database.
     *
     * @since 1.0.0
     *
     * @return bool True if the submission was deleted successfully, false otherwise.
     */
    public function delete_submission() {
        $submission_id = $this->data['submission_id'];
        $table_name    = $this->db_prefix . 'poptics_submissions';
        $result        = $this->wpdb->query( $this->wpdb->prepare( "DELETE FROM $table_name WHERE id = %d", $submission_id ) );

        return $result;
    }

    /**
     * Deletes multiple submissions from the database.
     *
     * @since 1.0.0
     *
     * @param array $submission_ids An array of submission IDs to delete.
     *
     * @return int The number of rows affected by the query.
     */
    public function bulk_delete_submissions() {
        $submission_ids = (array) $this->data['submission_ids'];
        $placeholders   = implode( ',', array_fill( 0, count( $submission_ids ), '%d' ) );

        $table_name = $this->db_prefix . 'poptics_submissions';
        $result     = $this->wpdb->query(
            $this->wpdb->prepare(
                "DELETE FROM $table_name WHERE id IN ($placeholders)",
                ...$submission_ids
            )
        );
        return $result;
    }

    /**
     * Retrieves the total number of submissions in the database.
     *
     * @since 1.0.0
     *
     * @return int The total number of submissions.
     */
    public function get_total_submissions() {
        $table_name = $this->db_prefix . 'poptics_submissions';

        $total_submissions = $this->wpdb->get_var( "SELECT COUNT(*) FROM $table_name" );
        return $total_submissions;
    }

    /**
     * Retrieves an array of unique locations from the submissions database table.
     *
     * @since 1.0.0
     *
     * @return array An array of unique locations. If no locations are found, an empty array is returned.
     */
    public function get_locations() {
        $data['locations'] = [];
        $results           = $this->wpdb->get_col( $this->wpdb->prepare(
            "SELECT DISTINCT location FROM {$this->db_prefix}poptics_submissions"
        ) );

        if ( $results ) {
            $data['locations'] = $results;
            return $data;
        }

        return $data;
    }

    /**
     * Retrieves all the devices from submissions in the database.
     *
     * @since 1.0.0
     *
     * @return array An array containing all the devices from submissions.
     */
    public function get_devices() {
        $data['devices'] = [];
        $results         = $this->wpdb->get_col( $this->wpdb->prepare(
            "SELECT DISTINCT device FROM {$this->db_prefix}poptics_submissions"
        ) );

        if ( $results ) {
            $data['devices'] = $results;
            return $data;
        }

        return $data;
    }

    /**
     * Get all the browsers used to submit the form.
     *
     * @since 1.0.0
     *
     * @return array The array of browsers.
     */
    public function get_browsers() {
        $data['browsers'] = [];
        $results          = $this->wpdb->get_col( $this->wpdb->prepare(
            "SELECT DISTINCT browser FROM {$this->db_prefix}poptics_submissions"
        ) );

        if ( $results ) {
            $data['browsers'] = $results;
            return $data;
        }

        return $data;
    }

    /**
     * Retrieves all user agent information in the database.
     *
     * @return array{
     *     'devices'   : array<string>,
     *     'browsers'  : array<string>,
     *     'locations' : array<string>,
     * }
     */
    public function get_user_agent() {
        $data = [
            'devices'   => [],
            'browsers'  => [],
            'locations' => [],
        ];

        $results = $this->wpdb->get_results( $this->wpdb->prepare(
            "SELECT DISTINCT device, browser, location FROM {$this->db_prefix}poptics_submissions"
        ) );

        if ( $results ) {
            foreach ( $results as $result ) {
                if ( !in_array( $result->device, $data['devices'] ) ) {
                    $data['devices'][] = $result->device;
                }

                if ( !in_array( $result->browser, $data['browsers'] ) ) {
                    $data['browsers'][] = $result->browser;
                }

                if ( !in_array( $result->location, $data['locations'] ) ) {
                    $data['locations'][] = $result->location;
                }
            }
        }

        return $data;
    }

    /**
     * Retrieves the count of submissions by status.
     *
     * @return array{
     *     'active' : int,
     *     'trash'  : int,
     * }
     */
    public function get_submission_status_count() {

        $table_name = $this->db_prefix . 'poptics_submissions';

        $results = $this->wpdb->get_results( $this->wpdb->prepare(
            "SELECT status, COUNT(*) AS count FROM $table_name GROUP BY status",
            []
        ) );

        $status_counts = [
            'total'  => 0,
            'active' => 0,
            'trash'  => 0,
        ];

        if ( $results ) {
            foreach ( $results as $result ) {
                $status_counts[$result->status] = $result->count;
                $status_counts['total']         = $status_counts['total'] + $status_counts[$result->status];
            }
        }

        return $status_counts;
    }
}