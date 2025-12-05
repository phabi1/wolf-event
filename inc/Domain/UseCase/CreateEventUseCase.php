<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;
use Wolf\Core\DependencyInjection\ContainerAwareTrait;

class CreateEventUseCase implements UseCaseInterface, ContainerAwareInterface
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

    public function execute(array $payload = array())
    {
        $data = $payload['data'];
        $eventRepository = $this->getEventRepository();
        $eventId = $eventRepository->insert($data);

        return $eventRepository->findById($eventId);
    }
}
