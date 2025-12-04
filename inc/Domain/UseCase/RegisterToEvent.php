<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\EventRepository;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class RegisterToEventUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use ContainerTrait;

    private EventRepository $eventRepository;
    private ParticipantRepository $participantRepository;

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
        if (!isset($data['event_id']) || !isset($data['participants'])) {
            throw new \InvalidArgumentException('Event ID and participant information are required to register a participant.');
        }

        if (!is_array($data['participants']) || empty($data['participants'])) {
            throw new \InvalidArgumentException('Participants data must be a non-empty array.');
        }

        $eventId = $data['event_id'];
        $participants = $data['participants'];

        $event = $this->eventRepository->findById($eventId);
        if (!$event) {
            throw new \InvalidArgumentException('Event not found.');
        }

        $now = time();
        if (!$this->isValidRegistrationPeriod($event, $now)) {
            throw new \InvalidArgumentException('Registration period is closed for this event.');
        }

        if ($this->isExceedingCapacity($event, count($participants))) {
            throw new \InvalidArgumentException('Registering these participants would exceed event capacity.');
        }

        $registeredParticipants = [];
        foreach ($participants as $participant) {
            $registeredParticipants[] = $this->registerParticipant($eventId, $participant);
        }

        // Update event's participant count
        $this->eventRepository->updateParticipantCount($eventId);

        return $registeredParticipants;
    }

    /**
     * Check if the current time is within the event's registration period.
     *
     * @param array $event
     * @param int $currentTime
     * @return bool
     */
    private function isValidRegistrationPeriod($event, $currentTime)
    {
        $registrationStart = isset($event['registration_start']) ? strtotime($event['registration_start']) : null;
        $registrationEnd = isset($event['registration_end']) ? strtotime($event['registration_end']) : null;

        if ($registrationStart && $currentTime < $registrationStart) {
            return false;
        }

        if ($registrationEnd && $currentTime > $registrationEnd) {
            return false;
        }

        return true;
    }

    /**
     * Check if adding new participants would exceed the event's capacity.
     *
     * @param array $event
     * @param int $newParticipantsCount
     * @return bool
     */
    private function isExceedingCapacity($event, $newParticipantsCount)
    {
        return $newParticipantsCount + $event['participant_count'] > $event['participant_max'];
    }

    private function registerParticipant($eventId, $participantData)
    {
        $participantData['event_id'] = $eventId;
        $participantId = $this->participantRepository->insert($participantData);
        return $this->participantRepository->findById($participantId);
    }
}
