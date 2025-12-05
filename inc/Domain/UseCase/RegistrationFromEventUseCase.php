<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerAwareTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;

class RegistrationFromEventUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * @var \Wolf\Event\Domain\Repository\EventRepository
     */
    private $eventRepository;

    public function getEventRepository()
    {
        if (!$this->eventRepository) {
            $this->eventRepository = $this->container->get('wolf-event.repository.event');
        }
        return $this->eventRepository;
    }

    public function execute(array $data = array())
    {
        $eventId = $data['id'] ?? null;

        if (!$eventId) {
            throw new \InvalidArgumentException('Event ID is required for registration.');
        }

        $event = $this->getEventRepository()->findById($eventId);

        if (!$event) {
            throw new \RuntimeException('Event not found.');
        }

        // Here you can add logic to check if registration is open, closed, etc.
        $status = 'open'; // This is a placeholder. Replace with actual logic.
        $now = time();
        if ($this->isEventRegistrationClosed($event, $now)) {
            $status = 'closed';
        } elseif ($this->isEventRegistrationUpcoming($event, $now)) {
            $status = 'upcoming';
        }

        return [
            'title' => $event->title,
            'description' => $event->description,
            'start_date' => $event->event_start,
            'end_date' => $event->event_end,
            'registration_start' => $event->registration_start,
            'registration_end' => $event->registration_end,
            'prices' => $event->prices,
            'participant_fields' => $event->participant_fields,
            'participant_max' => (int)$event->participant_max,
            'participant_count' => (int)$event->participant_count,
            'registration_status' => $status,
        ];
    }

    private function isEventRegistrationClosed($event, $now)
    {
        if (!$event->registration_end) {
            return false;
        }
        $end = strtotime($event->registration_end);
        return $now > $end;
    }

    private function isEventRegistrationUpcoming($event, $now)
    {
        if (!$event->registration_start) {
            return false;
        }
        $start = strtotime($event->registration_start);
        return $now < $start;
    }
}
