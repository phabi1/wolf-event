<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class RemoveEventUseCase implements UseCaseInterface
{
    private EventRepository $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required to remove an event.');
        }

        // Logic to remove an event
        $eventId = $data['id'];
        // Assume we have a repository to handle event data
        return $this->eventRepository->delete($eventId);
    }
}
