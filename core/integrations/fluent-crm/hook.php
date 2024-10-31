<?php

namespace Poptics\Core\Integrations\FluentCRM;

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
     * Initializing hook
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        add_action( 'poptics_after_submission_create', [$this, 'sending_data_to_fluent_crm'] );
    }

    /**
     * Sends the submission data to FluentCRM using the webhook URL.
     *
     * @param array $data The submission data.
     *
     * @return void
     */
    public function sending_data_to_fluent_crm( $data ) {
        $campaign_id  = $data['campaign_id'];
        $campaign     = new Campaign( $campaign_id );
        $integrations = $campaign->get_integrations();
        if ( !empty( $integrations['fluent_crm']['active'] ) ) {
            $settings = poptics_get_settings();

            if ( !empty( $settings['fluent_crm']['web_hook'] ) ) {
                $webhook = $settings['fluent_crm']['web_hook'];
                $body    = [
                    'email' => $data['email'],
                ];

                wp_remote_post( $webhook, ['body' => $body] );
            }
        }
    }
}