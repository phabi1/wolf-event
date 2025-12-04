<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class ListParticipantUseCase implements UseCaseInterface, ContainerAwareInterface
{

    use ContainerTrait;

    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function getParticipantRepository()
    {
        if (!$this->participantRepository) {
            $this->participantRepository = $this->container->get('wolf-event.repository.participant');
        }
        return $this->participantRepository;
    }

    public function setParticipantRepository(ParticipantRepository $participantRepository)
    {
        $this->participantRepository = $participantRepository;
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

        $participantRepository = $this->getParticipantRepository();
        $participants = $participantRepository->find([
            'event_id' => $options['event_id']
        ], $offset, $limit);
        $total = $participantRepository->count();

        return [
            'items' => $participants,
            'total' => $total,
        ];
    }
}
