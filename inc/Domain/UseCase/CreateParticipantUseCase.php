<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\Domain\Entity\EntityManager;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class CreateParticipantUseCase implements UseCaseInterface
{
    /**
     * @var EventRepository
     */
    private $eventRepository;

    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function __construct(
        EntityManager $entityManager
    ) {
        $this->eventRepository = $entityManager->getRepository('event');
        $this->participantRepository = $entityManager->getRepository('event-participant');
    }

    public function execute(array $payload = array())
    {
        $eventId = $payload['event_id'];
        $data = $payload['data'];

        $participant = [
            'event_id' => $eventId,
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'status' => isset($data['status']) ? $data['status'] : 'done',
            'custom_fields' => isset($data['custom_fields']) ? $data['custom_fields'] : [],
        ];


        $participantId = $this->participantRepository->insert($participant);

        $this->eventRepository->updateParticipantCount($eventId);

        return $this->participantRepository->findById($participantId);
    }
}
