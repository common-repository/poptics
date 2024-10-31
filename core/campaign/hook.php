<?php

namespace Poptics\Core\Campaign;

use Poptics\Utils\Singleton;

/**
 * Campaign hook class
 *
 * @since 1.0.0
 *
 * @package poptics
 */
class Hook {
    use Singleton;

    /**
     * Initializing necessary hooks for popup campaign
     *
     * @since 1.0.0
     * 
     * @return void
     */
    public function init() {
        add_action( 'init', [$this, 'register_poptics_campaign_custom_post_type'] );
        add_action( 'init', [$this, 'register_campaign_status'] );
    }

    /**
     * Register custom post type
     *
     * @since 1.0.0 
     * 
     * @return void
     */
    function register_poptics_campaign_custom_post_type() {
        $labels = array(
            'name'               => __( 'Poptics Campaign', 'poptics' ),
            'singular_name'      => __( 'Poptics Campaign', 'poptics' ),
            'menu_name'          => __( 'Poptics Campaigns', 'poptics' ),
            'add_new'            => __( 'Add New', 'poptics' ),
            'add_new_item'       => __( 'Add New Poptics Campaign', 'poptics' ),
            'edit'               => __( 'Edit', 'poptics' ),
            'edit_item'          => __( 'Edit Poptics Campaign', 'poptics' ),
            'new_item'           => __( 'New Poptics Campaign', 'poptics' ),
            'view'               => __( 'View', 'poptics' ),
            'view_item'          => __( 'View Poptics Campaign', 'poptics' ),
            'search_items'       => __( 'Search Poptics Campaigns', 'poptics' ),
            'not_found'          => __( 'No poptics campaign found', 'poptics' ),
            'not_found_in_trash' => __( 'No poptics campaign found in trash', 'poptics' ),
            'parent'             => __( 'Parent poptics Campaign', 'poptics' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'poptics-campaign' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        );

        register_post_type(
            'poptics-campaign',
            $args
        );
    }

    /**
     * Register campaign statuses
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function register_campaign_status() {
        $statuses = poptics_get_post_status();

        foreach ( $statuses as $status ) {
            $label_count = array(
                sprintf( '%s (%s)', $status, '%s' ),
                sprintf( '%s (%s)', $status, '%s' ),
            );

            register_post_status( $status, array(
                'public'                    => true,
                'exclude_from_search'       => false,
                'show_in_admin_all_list'    => false,
                'show_in_admin_status_list' => false,
                'label_count'               => $label_count,
            ) );
        }
    }
}