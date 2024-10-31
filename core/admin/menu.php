<?php

namespace Poptics\Core\Admin;

/**
 * Admin menu class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Menu {

    use \Poptics\Utils\Singleton;

    /**
     * Initialize
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init() {
        add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
    }

    /**
     * Register admin menu
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register_admin_menu() {
        global $submenu;
        $capability              = 'manage_options';
        $slug                    = 'poptics';
        $url                     = 'admin.php?page=' . $slug . '#';
        $poptics_menu_position   = 'poptics_menu_position_';
        $poptics_menu_permission = 'poptics_menu_permission_';

        $svg      = '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6337 32.7953C16.2677 32.7953 15.9018 32.6575 15.6261 32.3771C15.0701 31.821 15.0701 30.9179 15.6261 30.3618L29.3513 16.6353H21.3861C20.5972 16.6353 19.9604 15.9984 19.9604 15.2094C19.9604 14.4204 20.5972 13.7835 21.3861 13.7835H32.7921C32.9869 13.7835 33.1675 13.8216 33.3386 13.8929C33.5097 13.9642 33.6665 14.064 33.7996 14.2018C33.9374 14.3396 34.0372 14.4965 34.1085 14.6628C34.1798 14.8292 34.2178 15.0146 34.2178 15.2094V26.6165C34.2178 27.4055 33.581 28.0424 32.7921 28.0424C32.0032 28.0424 31.3663 27.4055 31.3663 26.6165V18.6506L17.6412 32.3771C17.3608 32.6575 16.9996 32.7953 16.6337 32.7953Z" fill="white"/><path d="M47.3537 3.24151C46.7786 2.11506 45.8804 1.21675 44.7588 0.646401C43.4899 0 42.1069 0 39.3505 0H22.1941C19.4424 0 18.0594 0 16.7857 0.646401C15.6594 1.22151 14.7612 2.11506 14.1909 3.24151C13.5446 4.51055 13.5446 5.89365 13.5446 8.65036V13.5459H8.64951C5.89782 13.5459 4.51485 13.5459 3.24119 14.1923C2.11485 14.7674 1.21663 15.6657 0.646337 16.7874C0 18.0564 0 19.4395 0 22.1963V39.3544C0 42.1063 0 43.4895 0.646337 44.7585C1.22139 45.8849 2.11485 46.7832 3.24119 47.3536C4.5101 48 5.89307 48 8.64951 48H25.8059C28.5576 48 29.9406 48 31.2143 47.3536C32.3406 46.7785 33.2388 45.8802 33.8091 44.7585C34.4554 43.4895 34.4554 42.1063 34.4554 39.3496V34.4541H39.3505C42.1022 34.4541 43.4851 34.4541 44.7588 33.8077C45.8851 33.2326 46.7834 32.3343 47.3537 31.2126C48 29.9436 48 28.5605 48 25.8085V8.65036C48 5.89841 48 4.5153 47.3537 3.24151ZM45.1485 25.8085C45.1485 28.0329 45.1485 29.2591 44.8111 29.9198C44.5117 30.5044 44.0459 30.9702 43.4614 31.2696C42.8008 31.6071 41.5747 31.6071 39.3505 31.6071H22.1941C19.9699 31.6071 18.7438 31.6071 18.0832 31.2696C17.4986 30.9702 17.0329 30.5044 16.7335 29.9198C16.396 29.2591 16.396 28.0329 16.396 25.8085V8.65036C16.396 6.42598 16.396 5.19972 16.7335 4.53906C17.0329 3.95445 17.4986 3.48866 18.0832 3.18923C18.7438 2.85177 19.9699 2.85177 22.1941 2.85177H39.3505C41.5747 2.85177 42.8008 2.85177 43.4614 3.18923C44.0459 3.48866 44.5117 3.95445 44.8111 4.53906C45.1485 5.19972 45.1485 6.42598 45.1485 8.65036V25.8085Z" fill="white"/></svg>';
        $svg_icon = 'data:image/svg+xml;base64,' . base64_encode( $svg );

        $menu_items = array(
            [
                'id'         => 'campaigns',
                'title'      => esc_html__( 'Campaigns', 'poptics' ),
                'link'       => '/',
                'capability' => apply_filters( $poptics_menu_permission . 'campaigns', $capability ),
                'position'   => apply_filters( $poptics_menu_position . 'campaigns', 1 ),
            ],
            [
                'id'         => 'analytics',
                'title'      => esc_html__( 'Analytics', 'poptics' ),
                'link'       => '/analytics',
                'capability' => apply_filters( $poptics_menu_permission . 'analytics', $capability ),
                'position'   => apply_filters( $poptics_menu_position . 'analytics', 2 ),
            ],
            [
                'id'         => 'templates',
                'title'      => esc_html__( 'Templates', 'poptics' ),
                'link'       => '/templates',
                'capability' => apply_filters( $poptics_menu_permission . 'templates', $capability ),
                'position'   => apply_filters( $poptics_menu_position . 'templates', 3 ),
            ],
            [
                'id'         => 'submissions',
                'title'      => esc_html__( 'Submissions', 'poptics' ),
                'link'       => '/submissions',
                'capability' => apply_filters( $poptics_menu_permission . 'submissions', $capability ),
                'position'   => apply_filters( $poptics_menu_position . 'submissions', 4 ),
            ],
            [
                'id'         => 'integrations',
                'title'      => esc_html__( 'Integrations', 'poptics' ),
                'link'       => '/integrations',
                'capability' => apply_filters( $poptics_menu_permission . 'integrations', $capability ),
                'position'   => apply_filters( $poptics_menu_position . 'integrations', 5 ),
            ],
            [
                'id'         => 'settings',
                'title'      => esc_html__( 'Settings', 'poptics' ),
                'link'       => '/settings',
                'capability' => apply_filters( $poptics_menu_permission . 'settings', $capability ),
                'position'   => apply_filters( $poptics_menu_position . 'settings', 6 ),
            ],
            [
                'id'         => 'onboard',
                'title'      => esc_html__( 'Onboard', 'poptics' ),
                'link'       => '/onboard',
                'capability' => apply_filters( $poptics_menu_permission . 'onboard', $capability ),
                'position'   => apply_filters( $poptics_menu_position . 'onboard', 7 ),
            ],
            // [
            //     'id'         => 'ab-testing',
            //     'title'      => esc_html__( 'A/B Testing (PRO)', 'poptics' ),
            //     'link'       => '/ab-testing',
            //     'capability' => apply_filters( $poptics_menu_permission . 'ab-testing', $capability ),
            //     'position'   => apply_filters( $poptics_menu_position . 'ab-testing', 8 ),
            // ],
        );

        add_menu_page(
            esc_html__( 'Poptics', 'poptics' ),
            esc_html__( 'Poptics', 'poptics' ),
            $capability,
            $slug,
            array( $this, 'poptics_dashboard_view' ),
            $svg_icon,
            10
        );

        $menu_items = apply_filters( 'poptics_menu', $menu_items );
        $position   = array_column( $menu_items, 'position' );

        array_multisort( $position, SORT_ASC, $menu_items );

        foreach ( $menu_items as $item ) {
            $external         = !empty( $item['external_link'] ) ? $item['external_link'] : false;
            $link             = !$external ? $url . $item['link'] : $item['link'];
            $submenu[$slug][] = [$item['title'], $item['capability'], $link]; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
        }
    }

    /**
     * Admin dashboard view
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function poptics_dashboard_view() {
        ?>
<div id="poptics_dashboard"></div>
<?php
}
}