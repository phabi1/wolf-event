<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class GetParticipantUseCase implements UseCaseInterface
{   
    private $participantRepository;

    public function __construct(ParticipantRepository $participantRepository)
    {
        $this->participantRepository = $participantRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required');
        }
        $participantId = $data['id'];

        $participant = $this->participantRepository->findById($participantId);

        return $participant;
    }
}
