<?php

namespace Poptics\Base;

/**
 * Core email class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
abstract class Email {

    /**
     * Get email subject
     *
     * @since 1.0.0
     *
     * @return  string
     */
    abstract public function get_subject();

    /**
     * Get email recipient
     *
     * @since 1.0.0
     *
     * @return string
     */
    abstract public function get_recipient();

    /**
     * Get email body
     *
     * @since 1.0.0
     *
     * @return string
     */
    abstract public function get_body();

    /**
     * Get email header
     *
     * @since 1.0.0
     *
     * @return  string
     */
    public function get_headers() {
        $from_name  = get_bloginfo( 'name' );
        $from_email = get_option( 'admin_email' );

        // Define MIME-Version and content type
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

        // Add custom From Name and From Email
        $headers .= 'From: ' . $from_name . ' <' . $from_email . '>' . "\r\n";

        return $headers;
    }

    /**
     * Send email using email template
     *
     * @since 1.0.0
     *
     * @return  bool
     */
    public function send() {
        $headers = $this->get_headers();
        $subject = $this->get_subject();
        $to      = $this->get_recipient();
        $body    = $this->get_body();

        $data = [$to, $subject, $body, $headers];

        return wp_mail( ...$data );
    }
}