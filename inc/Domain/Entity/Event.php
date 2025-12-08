<?php

namespace Wolf\Event\Domain\Entity;

use Wolf\Core\Domain\Entity\AbstractEntity;

class Event extends AbstractEntity
{
    private string $id;
    private string $title;
    private string $description;
    private string $location;
    private \DateTime $event_start;
    private \DateTime $event_end;
    private \DateTime $registration_start;
    private \DateTime $registration_end;
    private array $prices;
    private int $participant_count;
    private int $participant_max;
    private array $participant_fields;
    private string $created_at;
    private string $updated_at;

    // Getters and setters can be added here as needed
}