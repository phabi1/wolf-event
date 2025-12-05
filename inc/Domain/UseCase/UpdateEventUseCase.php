<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class UpdateEventUseCase implements UseCaseInterface
{
    /**
     * @var EventRepository
     */
    private $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required to update an event.');
        }

        // Logic to update an event
        $eventId = $data['id'];
            // Assume we have a repository to handle event data
        $this->eventRepository->update($eventId, $data['data']);
        return $this->eventRepository->findById($eventId);
    }
}
