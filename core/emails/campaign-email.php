<?php

namespace Poptics\Core\Emails;

use Poptics\Base\Email;

/**
 * Class Campaign_Email
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Campaign_Email extends Email {

    public $data;

    /**
     * Constructs a new instance of the Campaign_Email class.
     *
     * @since 1.0.0
     *
     * @param mixed $data The data to be assigned to the $data property.
     */
    public function __construct( $data ) {
        $this->data = $data;
    }

    /**
     * Get receiver email
     *
     * @since 1.0.0
     *
     * @return string
     */
    public function get_recipient() {
        return $this->data['receiver_email'];
    }

    /**
     * Get email subject
     *
     * @since 1.0.0
     *
     * @return string
     */
    public function get_subject() {
        return $this->data['subject'];
    }

    /**
     * Get email body
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function get_body() {
        return $this->data['body'];
    }
}