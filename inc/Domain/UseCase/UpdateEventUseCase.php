<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerAwareTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class UpdateEventUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * @var EventRepository
     */
    private $eventRepository;

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
            throw new \InvalidArgumentException('Event ID is required to update an event.');
        }

        // Logic to update an event
        $eventId = $data['id'];
        // Assume we have a repository to handle event data
        $eventRepository = new \Wolf\Event\Domain\Repository\EventRepository();
        $eventRepository->update($eventId, $data['data']);
        return $eventRepository->findById($eventId);
    }
}
