<?php

namespace Wolf\Event;

class Admin
{
    public function setup()
    {
        add_menu_page(
            'Events',
            'Events',
            'manage_options',
            'wolf-events',
            [$this, 'render_events_page'],
            'dashicons-calendar-alt',
            6
        );
    }

    public function render_events_page()
    {
        //include the index.assest.php file for taking the dependencies and               version
        $mfile = include(plugin_dir_path(__FILE__) . '/../build/admin/index.asset.php');

        //enqueue the react built script
        wp_enqueue_script('wolf-events-admin', plugin_dir_url(__DIR__) . '/build/admin/index.js', $mfile['dependencies'], $mfile['version'], true);

        echo '<div id="app"></div>';
    }
}
