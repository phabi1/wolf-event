<?php

namespace Wolf\Event\Domain\Entity;

use Wolf\Core\Domain\Entity\AbstractEntity;

class Participant extends AbstractEntity
{
    private string $id;
    private string $event_id;
    private ?int $user_id;
    private string $lastname;
    private string $firstname;
    private string $email;
    private array $custom_fields = array();
    private string $status;
    private \DateTime $created_at;
    private \DateTime $updated_at;

    // Getters and setters can be added here as needed
}