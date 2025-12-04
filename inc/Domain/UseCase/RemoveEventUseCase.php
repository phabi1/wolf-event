<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class RemoveEventUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use ContainerTrait;

    private EventRepository $eventRepository;

    public function getEventRepository()
    {
        if (!$this->eventRepository) {
            $this->eventRepository = $this->container->get('wolf-event.repository.event');
        }
        return $this->eventRepository;
    }

    public function setEventRepository(EventRepository $eventRepository)
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
        $eventRepository = new EventRepository();
        return $eventRepository->delete($eventId);
    }
}
