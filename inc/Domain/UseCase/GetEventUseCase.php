<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class GetEventUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use \Wolf\Core\DependencyInjection\ContainerTrait;

    private $eventRepository;

    public function getEventRepository()
    {
        if (!$this->eventRepository) {
            $this->eventRepository = $this->container->get('wolf-event.repository.event');
        }
        return $this->eventRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required');
        }
        $eventId = $data['id'];

        $eventRepository = $this->getEventRepository();
        $event = $eventRepository->findById($eventId);

        return $event;
    }
}
