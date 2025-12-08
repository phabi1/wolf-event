<?php

namespace Wolf\Event\Domain\Repository;

use Wolf\Core\Domain\Entity\Repository\AbstractEntityRepository;

class EventRepository extends AbstractEntityRepository
{
    public function updateParticipantCount($eventId)
    {
        $definition = $this->getDefinition();

        $participantDefinition = $this->getEntityDefinition()->get('event-participant');

        $table = $this->db->prefix . $participantDefinition->getTable();
        $count = $this->db->get_var(
            $this->db->prepare(
                "SELECT COUNT(*) FROM " . $table . " WHERE event_id = %d",
                $eventId
            )
        );

        $this->db->update(
            ['participant_count' => $count],
            ['id' => $eventId]
        );
    }
}
