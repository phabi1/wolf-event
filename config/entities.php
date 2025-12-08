<?php

use Wolf\Event\Domain\Entity\Event;
use Wolf\Event\Domain\Entity\Participant;

return [
    'event' => [
        'entity_class' => Event::class,
        'repository_class' => '',
        'table' => 'wolf-event_event',
        'fields' => [
            'title' => [
                'type' => 'string',
                'required' => true,
            ],
            "description" => ['type' => 'string'],
            'event_start' => ['type' => 'datetime'],
            'event_end' => ["type" => 'datetime'],
            'registration_start' => ['type' => 'datetime', 'nullable' => true],
            'registration_end' => ['type' => 'datetime', 'nullable' => true],
            'participant_count' => ['type' => 'int', 'readonly' => true],
            'participant_max' => ['type' => 'int'],
            'participant_fields' => ['type' => 'json'],
            'prices' => ['type' => 'json']
        ]
    ],
    'event-participant' => [
        'entity_class' => Participant::class,
        'repostory_class' => '',
        'table' => 'wolf_event_event_participant',
        'fields' => [
            'firstname' => [
                'type' => 'string',
                'required' => true,
            ],
            'lastname' => [
                'type' => 'string',
                'required' => true,
            ],
            "email" => ['type' => 'string', 'required' => true],
            'status' => ['type' => 'enum', 'enum' => ['pending', 'completed', 'canceled']],
            'custom_fields' => ['type' => 'json']
        ]
    ]
];