<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class GetParticipantUseCase implements UseCaseInterface
{

    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function __construct(EntityManager $entityManager)
    {
        $this->participantRepository = $entityManager->getRepository('event-participant');
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
