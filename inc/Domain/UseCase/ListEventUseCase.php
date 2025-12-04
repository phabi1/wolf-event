<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class ListEventUseCase implements UseCaseInterface, ContainerAwareInterface
{

    use ContainerTrait;

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

    public function execute(array $options = array())
    {
        $options += [
            'page' => 1,
            'size' => 10,
        ];

        // Assume we have a repository to handle event data
        $page = $options['page'];
        $size = $options['size'];

        $offset = ($page - 1) * $size;
        $limit = $size;

        $eventRepository = $this->getEventRepository();
        $events = $eventRepository->find([], $offset, $limit);
        $total = $eventRepository->count();

        return [
            'items' => $events,
            'total' => $total,
        ];
    }
}
