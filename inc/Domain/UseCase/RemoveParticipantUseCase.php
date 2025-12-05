<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class RemoveParticipantUseCase implements UseCaseInterface
{
    /**
     * @var EventRepository
     */
    private $eventRepository;

    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function __construct(EventRepository $eventRepository, ParticipantRepository $participantRepository)
    {
        $this->eventRepository = $eventRepository;
        $this->participantRepository = $participantRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Participant ID is required to remove a participant.');
        }

        // Logic to remove a participant
        $participantId = $data['id'];
        // Assume we have a repository to handle participant data
        $this->participantRepository->delete($participantId);

        $this->eventRepository->updateParticipantCount($data['event_id']);
        return true;
    }
}
