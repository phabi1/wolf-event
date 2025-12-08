<?php

return [
    'wolf-event.repository.event' => \Wolf\Event\Domain\Repository\EventRepository::class,
    'wolf-event.repository.participant' => \Wolf\Event\Domain\Repository\ParticipantRepository::class,
    'wolf-event.usecase.list_events' => [
        'class' => \Wolf\Event\Domain\UseCase\ListEventUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'list_events']
        ],
    ],
    'wolf-event.usecase.get_event' => [
        'class' => \Wolf\Event\Domain\UseCase\GetEventUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'get_event']
        ],
    ],
    'wolf-event.usecase.create_event' => [
        'class' => \Wolf\Event\Domain\UseCase\CreateEventUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'create_event']
        ],
    ],
    'wolf-event.usecase.update_event' => [
        'class' => \Wolf\Event\Domain\UseCase\UpdateEventUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'update_event']
        ],
    ],
    'wolf-event.usecase.remove_event' => [
        'class' => \Wolf\Event\Domain\UseCase\RemoveEventUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'remove_event']
        ],
    ],
    'wolf-event.usecase.registration_from_event' => [
        'class' => \Wolf\Event\Domain\UseCase\RegistrationFromEventUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'registration_from_event']
        ],
    ],
    'wolf-event.usecase.register_to_event' => [
        'class' => \Wolf\Event\Domain\UseCase\RegisterToEventUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event',
            '@wolf-event.repository.participant'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'register_to_event']
        ],
    ],
    'wolf-event.usecase.list_participants' => [
        'class' => \Wolf\Event\Domain\UseCase\ListParticipantUseCase::class,
        'arguments' => [
            '@wolf-event.repository.participant'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'list_participants']
        ],
    ],
    'wolf-event.usecase.get_participant' => [
        'class' => \Wolf\Event\Domain\UseCase\GetParticipantUseCase::class,
        'arguments' => [
            '@wolf-event.repository.participant'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'get_participant']
        ],
    ],
    'wolf-event.usecase.create_participant' => [
        'class' => \Wolf\Event\Domain\UseCase\CreateParticipantUseCase::class,
        'arguments' => [
            '@wolf-event.repository.participant'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'create_participant']
        ],
    ],
    'wolf-event.usecase.update_participant' => [
        'class' => \Wolf\Event\Domain\UseCase\UpdateParticipantUseCase::class,
        'arguments' => [
            '@wolf-event.repository.participant'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'update_participant']
        ],
    ],
    'wolf-event.usecase.remove_participant' => [
        'class' => \Wolf\Event\Domain\UseCase\RemoveParticipantUseCase::class,
        'arguments' => [
            '@wolf-event.repository.event',
            '@wolf-event.repository.participant'
        ],
        'tags' => [
            ['name' => 'wolf-core.use-case', 'key' => 'remove_participant']
        ],
    ],
];
