<?php

namespace Poptics\Base;

/**
 * Main post class
 *
 * @since 1.0.0
 *
 * @package Poptics
 */
class Post {

    /**
     * Store post object
     *
     * @since 1.0.0
     *
     * @var Object
     */
    private $post;

    /**
     * Post class constructor
     *
     * @since 1.0.0
     *
     * @return  void
     */
    public function __construct( PostModel $post ) {
        $this->post = $post;
    }

    /**
     * Create post
     *
     * @since 1.0.0
     *
     * @param   array  $args
     *
     * @return PostModel
     */
    public function create( $args = [] ) {
        $defaults = [
            'post_title'  => '',
            'post_type'   => $this->post->post_type,
            'post_status' => 'publish',
            'post_author' => 1,
        ];

        $args    = wp_parse_args( $args, $defaults );
        $post_id = wp_insert_post( $args );

        $this->load( $this->post, $post_id );
        $this->save_meta( $args );

        return $this->post;
    }

    /**
     * Update post
     *
     * @since 1.0.0
     *
     * @param   array  $args
     *
     * @return PostModel
     */
    public function update( $post_id, $args = [] ) {
        $defaults = [
            'post_title'  => '',
            'post_type'   => $this->post->post_type,
            'post_status' => 'publish',
            'ID'          => $post_id,
            'post_author' => 1,
        ];

        $args = wp_parse_args( $args, $defaults );

        $post_id = wp_update_post( $args );

        $this->load( $this->post, $post_id );
        $this->save_meta( $args );

        return $this->post;
    }

    /**
     * Delete post
     *
     * @since 1.0.0
     *
     * @return  boolean
     */
    public function delete( $post_id = 0 ) {
        return wp_delete_post( $post_id, true );
    }

    /**
     * Update post meta data
     *
     * @since 1.0.0
     *
     * @param   array  $props
     *
     * @return  void
     */
    public function save_meta( $props = [] ) {
        foreach ( $props as $key => $value ) {
            $meta_key = $this->post->prefix . $key;

            // If a meta key exists on that post then update the post meta.
            if ( array_key_exists( $key, $this->post->data ) ) {
                update_post_meta( $this->post->id, $meta_key, $value );
            }
        }
    }

    /**
     * Load all properties every model
     *
     * @since 1.0.0
     *
     * @param   PostModel  $object  Post model object
     * @param   Object  $post    WordPress post object
     *
     * @return  void
     */
    public function load( $object, $post ) {

        if ( is_int( $post ) ) {
            $post = get_post( $post );
        }

        $data       = $object->data;
        $object->id = $post->ID;
        unset( $data['id'] );

        foreach ( $data as $key => $value ) {
            $prop         = $object->get_prop( $key );
            $object->$key = '' === $prop ? $value : $prop;
        }
    }

    /**
     * Get post a single post
     *
     * @since 1.0.0
     *
     * @param   integer  $post_id
     *
     * @return  PostModel
     */
    public function find( $post_id ) {
        $post = get_post( $post_id );

        if ( $post ) {
            $this->load( $this->post, $post );
        }

        return $this->post;
    }
}