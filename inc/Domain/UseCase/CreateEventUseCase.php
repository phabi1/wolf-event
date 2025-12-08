<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\Entity\EntityManager;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class CreateEventUseCase implements UseCaseInterface
{
    /**
     * @var EventRepository
     */
    private $eventRepository;

    public function __construct(EntityManager $entityManager)
    {
        $this->eventRepository = $entityManager->getRepository('event');
    }

    public function execute(array $payload = array())
    {
        $data = $payload['data'];
        $eventId = $this->eventRepository->insert($data);

        return $this->eventRepository->findById($eventId);
    }
}
