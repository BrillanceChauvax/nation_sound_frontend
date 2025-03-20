<?php

// Assurez-vous que le fichier est sécurisé
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Empêche l'accès direct au fichier
}

// Enqueue les scripts React et les styles CSS
function nation_sound_enqueue_scripts() {
    wp_enqueue_script(
        'nation-sound-react-app',
        get_template_directory_uri() . '/build/index.js',
        array( 'wp-element' ),
        time(),
        true
    );

    wp_enqueue_style(
        'nation-sound-style',
        get_stylesheet_uri(),
        array(),
        time()
    );
}
add_action('wp_enqueue_scripts', 'nation_sound_enqueue_scripts');

// Exécuter les shortcodes dans l'API REST
add_filter('rest_prepare_page', function($response, $post, $request) {
    if (!empty($response->data['content']['rendered'])) {
        $response->data['content']['rendered'] = do_shortcode($response->data['content']['rendered']);
    }
    return $response;
}, 10, 3);

?>
