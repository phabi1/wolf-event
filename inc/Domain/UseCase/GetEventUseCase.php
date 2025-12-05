<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class GetEventUseCase implements UseCaseInterface
{
    private $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required');
        }
        $eventId = $data['id'];

        $event = $this->eventRepository->findById($eventId);

        return $event;
    }
}
