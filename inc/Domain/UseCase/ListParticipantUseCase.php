<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class ListParticipantUseCase implements UseCaseInterface
{
    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function __construct(ParticipantRepository $participantRepository)
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
        
        $participants = $this->participantRepository->find([
            'event_id' => $options['event_id']
        ], $offset, $limit);
        $total = $this->participantRepository->count();
        return [
            'items' => $participants,
            'total' => $total,
        ];
    }
}
