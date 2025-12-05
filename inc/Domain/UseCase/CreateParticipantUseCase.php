<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerAwareTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;

class CreateParticipantUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * @var EventRepository
     */
    private $eventRepository;

    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function getEventRepository()
    {
        if (!$this->eventRepository) {
            $this->eventRepository = $this->container->get('wolf-event.repository.event');
        }
        return $this->eventRepository;
    }

    public function getParticipantRepository()
    {
        if (!$this->participantRepository) {
            $this->participantRepository = $this->container->get('wolf-event.repository.participant');
        }
        return $this->participantRepository;
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

        $participantRepository = $this->getParticipantRepository();
        $participantId = $participantRepository->insert($participant);

        $eventRepository = $this->getEventRepository();
        $eventRepository->updateParticipantCount($eventId);

        return $participantRepository->findById($participantId);
    }
}
