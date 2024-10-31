<?php

namespace Poptics\Core;

use Poptics\Utils\Singleton;

/**
 * Base class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Base {
    use Singleton;

    /**
     * Initializing necessary base components
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        Admin\Menu::instance()->init();
        Admin\Hook::instance()->init();

        Onboard\Api_Onboard::instance();
        Settings\Api_Settings::instance();

        Campaign\Hook::instance()->init();
        Campaign\Api_Campaign::instance();

        Analytics\Hook::instance()->init();
        Analytics\Api_Analytics::instance();
        Frontend\Hook::instance()->init();

        Submissions\Api_Submissions::instance();
        Submissions\Hook::instance()->init();

        Integrations\FluentCrm\Hook::instance()->init();
        
        Template\Api_Template::instance();
    }
}