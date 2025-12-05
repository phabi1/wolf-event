<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerAwareTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class RemoveParticipantUseCase implements UseCaseInterface, ContainerAwareInterface
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

    public function setEventRepository(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

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

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Participant ID is required to remove a participant.');
        }

        // Logic to remove a participant
        $participantId = $data['id'];
        // Assume we have a repository to handle participant data
        $participantRepository = $this->getParticipantRepository();
        $participantRepository->delete($participantId);

        $eventRepository = $this->getEventRepository();
        $eventRepository->updateParticipantCount($data['event_id']);
        return true;
    }
}
