<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\Entity\EntityManager;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;

class ListEventUseCase implements UseCaseInterface{

    /**
     * @var EventRepository
     */
    private $eventRepository;

    public function __construct(EntityManager $entityManager)
    {
        $this->eventRepository = $entityManager->getRepository('event');
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

        $events = $this->eventRepository->find([], $offset, $limit);
        $total = $this->eventRepository->count();

        return [
            'items' => $events,
            'total' => $total,
        ];
    }
}
