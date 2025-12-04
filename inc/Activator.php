<?php

namespace Wolf\Event;

class Activator
{
    public function activate()
    {
        $this->createTables();
    }

    public function deactivate()
    {
        $this->removeTables();
    }

    protected function createTables()
    {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $tables = [
            "CREATE TABLE {$wpdb->prefix}wolf_event_events (
                id INT(11) NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                event_start DATETIME NOT NULL,
                event_end DATETIME NOT NULL,
                registration_start DATETIME DEFAULT NULL,
                registration_end DATETIME DEFAULT NULL,
                prices TEXT DEFAULT NULL,
                location VARCHAR(255) DEFAULT NULL,
                participant_count INT NOT NULL DEFAULT 0,
                participant_max INT NOT NULL DEFAULT 0,
                participant_fields TEXT DEFAULT NULL,
                payment_methods VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL,
                PRIMARY KEY (id)
            ) $charset_collate;",

            "CREATE TABLE {$wpdb->prefix}wolf_event_participants (
                id INT(11) NOT NULL AUTO_INCREMENT,
                event_id INT(11) NOT NULL,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                status VARCHAR(50) NOT NULL,
                custom_fields TEXT DEFAULT NULL,
                checkout_order_id VARCHAR(36) DEFAULT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (event_id) REFERENCES {$wpdb->prefix}wolf_event_events(id) ON DELETE CASCADE
            ) $charset_collate;",

            "CREATE TABLE {$wpdb->prefix}wolf_event_participants_fields (
                event_id INT(11) NOT NULL,
                participant_id INT(11) NOT NULL,
                field_name VARCHAR(255) NOT NULL,
                field_value TEXT DEFAULT NULL,
                PRIMARY KEY (event_id, participant_id, field_name),
                FOREIGN KEY (event_id) REFERENCES {$wpdb->prefix}wolf_event_events(id) ON DELETE CASCADE,
                FOREIGN KEY (participant_id) REFERENCES {$wpdb->prefix}wolf_event_participants(id) ON DELETE CASCADE
            ) $charset_collate;",

        ];

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        foreach ($tables as $table_sql) {
            \dbDelta($table_sql);
        }
    }

    protected function removeTables()
    {
        global $wpdb;

        $tables = [
            "wolf_event_participants_fields",
            "wolf_event_participants",
            "wolf_event_events",
        ];

        foreach ($tables as $table_name) {
            $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}$table_name");
        }
    }
}
