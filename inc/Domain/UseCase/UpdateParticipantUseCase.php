<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class UpdateParticipantUseCase implements UseCaseInterface
{
    
    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function __construct(ParticipantRepository $participantRepository)
    {
        $this->participantRepository = $participantRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required to update an event.');
        }

        // Logic to update an event
        $participantId = $data['id'];
        // Assume we have a repository to handle participant data
        $this->participantRepository->update($participantId, $data['data']);
        return $this->participantRepository->findById($participantId);
    }
}
