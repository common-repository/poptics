<?php
// All the global helper functions will go here.
defined( 'ABSPATH' ) || exit;

if ( !function_exists( 'poptics_get_post_status' ) ) {

    /**
     * Get post status
     *
     * @return  array
     */
    function poptics_get_post_status() {
        return array(
            'active',
            'paused',
            'scheduled',
            'completed',
            'draft',
            'trash',
        );
    }

}

if ( !function_exists( 'poptics_sanitize_recursive' ) ) {
    /**
     * Recursively sanitize nested array of objects input field
     *
     * @since 1.0.0
     *
     * @param array $input
     *
     * @return array
     */
    function poptics_sanitize_recursive( $input ) {

        if ( is_array( $input ) ) {

            foreach ( $input as $key => $value ) {
                $input[$key] = poptics_sanitize_recursive( $value );
            }

        } elseif ( is_object( $input ) ) {

            foreach ( $input as $key => $value ) {
                $input->$key = poptics_sanitize_recursive( $value );
            }

        } else {

            if ( is_string( $input ) ) {
                $input = wp_kses_post( $input );
            } elseif ( is_email( $input ) ) {
                $input = sanitize_email( $input );
            } elseif ( is_int( $input ) ) {
                $input = intval( $input );
            } elseif ( is_float( $input ) ) {
                $input = floatval( $input );
            }

        }

        return $input;
    }

}

if ( !function_exists( 'poptics_editor_settings' ) ) {
    /**
     * Retrieves the settings for the Gutenberg editor.
     *
     * This function retrieves the settings for the Gutenberg editor, including the allowed block types,
     * typography, color palette, and other experimental features. It also applies filters to allow
     * customization of the settings.
     *
     * @return array The settings for the Gutenberg editor.
     */
    function poptics_editor_settings() {
        $coreSettings            = get_block_editor_settings( array(), 'post' );
        $wordpressCoreTypography = $coreSettings['__experimentalFeatures']['typography'];
        $coreExperimentalSpacing = $coreSettings['__experimentalFeatures']['spacing'];

        $allowedBlocks = array(
            'core/paragraph',
            'core/heading',
            'core/buttons',
            'core/image',
            'core/columns',
            'core/list',
            'core/list-item',
            'core/freeform',
            'core/html',
            'core/spacer',
            'core/subhead',
            'core/table',
            'core/verse',
            'core/group',
            'core/column',
            'core/buttons',
            'core/button',
            'core/cover',
            'core/rss',
            'core/audio',
            'core/video',
            'core/quote',
            'core/gallery',
            'core/file',
            'core/code',
            'core/preformatted',
            'core/pullquote',
            'core/media-text',
            'core/more',
            'core/nextpage',
            'core/separator',
            'core/shortcode',
            'core/embed',
            'core/latest-posts',
            'core/latest-comments',
            'core/archives',
            'core/categories',
            'core/tag-cloud',
            'core/search',
            'poptics/cover',
            'poptics/custom-form',
            'poptics/custom-input',
            'poptics/style-settings',
            'poptics/countdown',
            'poptics/custom-button',
            'poptics/heading',
        );

        $allowedBlocks = apply_filters( 'poptics_allowed_block_types', $allowedBlocks );
        $themePref     = poptics_get_theme_pref_scheme();

        $settings = array(
            'gradients'                         => array(),
            'alignWide'                         => false,
            'allowedMimeTypes'                  => get_allowed_mime_types(),
            'allowedBlockTypes'                 => $allowedBlocks,
            '__experimentalBlockPatterns'       => array(),
            '__experimentalFeatures'            => array(
                'appearanceTools' => true,
                'border'          => array(
                    'color'  => false,
                    'radius' => true,
                    'style'  => false,
                    'width'  => false,
                ),
                'color'           => array(
                    'background'       => true,
                    'customDuotone'    => false,
                    'defaultGradients' => false,
                    'defaultPalette'   => false,
                    'duotone'          => array(),
                    'gradients'        => array(),
                    'link'             => false,
                    'palette'          => array(
                        'theme' => $themePref['colors'],
                    ),
                    'text'             => true,
                ),
                'spacing'         => $coreExperimentalSpacing,
                'typography'      => $wordpressCoreTypography,
                'blocks'          => array(
                    'core/button' => array(
                        'border'     => array(
                            'radius' => true,
                            "style"  => true,
                            "width"  => true,
                        ),
                        'typography' => array(
                            'fontSizes' => array(),
                        ),
                        'spacing'    => $coreExperimentalSpacing,
                    ),

                ),
            ),
            '__experimentalSetIsInserterOpened' => false,
            'disableCustomColors'               => get_theme_support( 'disable-custom-colors' ),
            'disableCustomFontSizes'            => false,
            'disableCustomGradients'            => true,
            'enableCustomLineHeight'            => get_theme_support( 'custom-line-height' ),
            'enableCustomSpacing'               => get_theme_support( 'custom-spacing' ),
            'enableCustomUnits'                 => false,
            'keepCaretInsideBlock'              => false,
        );

        $color_palette = current( (array) get_theme_support( 'editor-color-palette' ) );

        if ( false !== $color_palette ) {
            $settings['colors'] = $color_palette;
        } else {
            $settings['colors'] = array();
        }

        return $settings;
    }

}

if ( !function_exists( 'poptics_get_theme_pref_scheme' ) ) {
    /**
     * Retrieves the theme preference scheme.
     *
     * This function retrieves the theme preference scheme, which includes the color palette and font sizes.
     * The color palette is an array of objects, each representing a color with its name, slug, and hex code.
     * The font sizes is an array of objects, each representing a font size with its name, short name, size, and slug.
     * The function applies filters to allow customization of the theme preference scheme.
     *
     * @return array The theme preference scheme.
     */
    function poptics_get_theme_pref_scheme() {
        static $pref;

        if ( !$pref ) {

            $color_palette = array(
                array(
                    "name"  => __( "Black", "poptics" ),
                    "slug"  => "black",
                    "color" => "#000000",
                ),
                array(
                    "name"  => __( "Cyan bluish gray", "poptics" ),
                    "slug"  => "cyan-bluish-gray",
                    "color" => "#abb8c3",
                ),
                array(
                    "name"  => __( "White", "poptics" ),
                    "slug"  => "white",
                    "color" => "#ffffff",
                ),
                array(
                    "name"  => __( "Pale pink", "poptics" ),
                    "slug"  => "pale-pink",
                    "color" => "#f78da7",
                ),
                array(
                    "name"  => __( "Luminous vivid orange", "poptics" ),
                    "slug"  => "luminous-vivid-orange",
                    "color" => "#ff6900",
                ),
                array(
                    "name"  => __( "Luminous vivid amber", "poptics" ),
                    "slug"  => "luminous-vivid-amber",
                    "color" => "#fcb900",
                ),
                array(
                    "name"  => __( "Light green cyan", "poptics" ),
                    "slug"  => "light-green-cyan",
                    "color" => "#7bdcb5",
                ),
                array(
                    "name"  => __( "Vivid green cyan", "poptics" ),
                    "slug"  => "vivid-green-cyan",
                    "color" => "#00d084",
                ),
                array(
                    "name"  => __( "Pale cyan blue", "poptics" ),
                    "slug"  => "pale-cyan-blue",
                    "color" => "#8ed1fc",
                ),
                array(
                    "name"  => __( "Vivid cyan blue", "poptics" ),
                    "slug"  => "vivid-cyan-blue",
                    "color" => "#0693e3",
                ),
                array(
                    "name"  => __( "Vivid purple", "poptics" ),
                    "slug"  => "vivid-purple",
                    "color" => "#9b51e0",
                ),
            );

            $font_sizes = array(
                array(
                    'name'      => __( 'Small', 'poptics' ),
                    'shortName' => 'S',
                    'size'      => 14,
                    'slug'      => 'small',
                ),
                array(
                    'name'      => __( 'Medium', 'poptics' ),
                    'shortName' => 'M',
                    'size'      => 18,
                    'slug'      => 'medium',
                ),
                array(
                    'name'      => __( 'Large', 'poptics' ),
                    'shortName' => 'L',
                    'size'      => 24,
                    'slug'      => 'large',
                ),
                array(
                    'name'      => __( 'Larger', 'poptics' ),
                    'shortName' => 'XL',
                    'size'      => 32,
                    'slug'      => 'larger',
                ),
            );

            $pref = apply_filters( 'poptics_theme_pref', array(
                'colors'     => (array) $color_palette,
                'font_sizes' => (array) $font_sizes,
            ) );
        }

        return $pref;
    }
}

if ( !function_exists( 'poptics_verify_nonce' ) ) {

    /**
     * Verifies the given nonce against the 'wp_rest' action.
     *
     * @param string $nonce The nonce to be verified.
     * @return bool Returns true if the nonce is valid, false otherwise.
     */

    function poptics_verify_nonce( $nonce ) {
        if ( ( isset( $nonce ) && wp_verify_nonce( $nonce, 'wp_rest' ) ) || POPTICS_DEBUG_MODE ) {
            return true;
        }

        $response = [
            'success'     => 0,
            'status_code' => 403,
            'message'     => esc_html__( 'Nonce not verified', 'poptics' ),
            'data'        => [],
        ];
        return new WP_HTTP_Response( $response, 403 );
    }
}

if ( !function_exists( 'poptics_get_active_posts' ) ) {
    /**
     * Will return all published posts
     *
     * @return void
     */
    function poptics_get_active_posts( $post_type ) {
        $args = array(
            'post_type'      => $post_type,
            'post_status'    => 'publish',
            'posts_per_page' => -1,
        );

        $query = new WP_Query( $args );

        $results = array();

        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $results[] = array(
                    'id'    => get_the_ID(),
                    'title' => get_the_title(),
                    'link'  => get_permalink(),
                );
            }
        }

        wp_reset_postdata();

        return $results;
    }
}

if ( !function_exists( 'poptics_delete_campaigns' ) ) {
    /**
     * Deletes all campaigns.
     *
     * @since 1.0.0
     */
    function poptics_delete_campaigns() {
        $posts = get_posts( array(
            'post_type'   => 'poptics-campaign',
            'post_status' => 'any',
            'numberposts' => -1,
        ) );

        foreach ( $posts as $post ) {
            wp_delete_post( $post->ID, true );
        }
    }
}