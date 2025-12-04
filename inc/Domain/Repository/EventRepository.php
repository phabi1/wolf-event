<?php

namespace Wolf\Event\Domain\Repository;

use Wolf\Core\Domain\Repository\AbstractRepository;

class EventRepository extends AbstractRepository
{
    public function __construct()
    {
        parent::__construct('wolf_event_events');
    }

    public function find(array $conditions = [], $offset = 0, $limit = 10)
    {
        $items = parent::find($conditions, $offset, $limit);
        foreach ($items as $item) {
            if (isset($item->participant_fields)) {
                $item->participant_fields = json_decode($item->participant_fields, true);
            } else {
                $item->participant_fields = [];
            }
            if (isset($item->prices)) {
                $item->prices = json_decode($item->prices, true);
            } else {
                $item->prices = [];
            }
        }
        return $items;
    }

    public function findById($id)
    {
        $item = parent::findById($id);
        if ($item) {
            if (isset($item->participant_fields)) {
                $item->participant_fields = json_decode($item->participant_fields, true);
            } else {
                $item->participant_fields = [];
            }
            if (isset($item->prices)) {
                $item->prices = json_decode($item->prices, true);
            } else {
                $item->prices = [];
            }
        }
        return $item;
    }

    public function insert(array $data)
    {
        if (isset($data['participant_fields'])) {
            $data['participant_fields'] = json_encode($data['participant_fields']);
        }
        if (isset($data['prices'])) {
            $data['prices'] = json_encode($data['prices']);
        }

        return parent::insert($data);
    }

    public function update($id, array $data)
    {
        if (isset($data['participant_fields'])) {
            $data['participant_fields'] = json_encode($data['participant_fields']);
        }
        if (isset($data['prices'])) {
            $data['prices'] = json_encode($data['prices']);
        }

        return parent::update($id, $data);
    }

    public function updateParticipantCount($eventId)
    {
        $table = $this->db->prefix . 'wolf_event_participants';
        $count = $this->db->get_var(
            $this->db->prepare(
                "SELECT COUNT(*) FROM ".$table." WHERE event_id = %d",
                $eventId
            )
        );
        $this->update(
            ['participant_count' => $count],
            ['id' => $eventId]
        );
    }
}
