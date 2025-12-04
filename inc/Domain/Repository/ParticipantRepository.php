<?php

namespace Wolf\Event\Domain\Repository;

use Wolf\Core\Domain\Repository\AbstractRepository;

class ParticipantRepository extends AbstractRepository
{
    public function __construct()
    {
        parent::__construct('wolf_event_participants');
    }

    public function find(array $conditions = [], $offset = 0, $limit = 10)
    {
        $res = parent::find($conditions, $offset, $limit);
        foreach ($res as $item) {
            if (isset($item->custom_fields)) {
                $item->custom_fields = json_decode($item->custom_fields, true);
            }
        }
        return $res;
    }

    public function findById($id)
    {
        $item = parent::findById($id);
        if ($item && isset($item->custom_fields)) {
            $item->custom_fields = json_decode($item->custom_fields, true);
        }
        return $item;
    }

    public function insert(array $data)
    {
        $customFields = [];
        if (isset($data['custom_fields'])) {
            $customFields = $data['custom_fields'];
            $data['custom_fields'] = json_encode($data['custom_fields']);
        }
        $participantId = parent::insert($data);

        if (!empty($customFields)) {
            foreach ($customFields as $fieldKey => $fieldValue) {
                $this->db->insert(
                    $this->db->prefix . 'wolf_event_participants_fields',
                    [
                        'participant_id' => $participantId,
                        'event_id' => $data['event_id'],
                        'field_name' => $fieldKey,
                        'field_value' => is_array($fieldValue) ? json_encode($fieldValue) : $fieldValue,
                    ]
                );
            }
        }

        return $participantId;
    }

    public function update($id, array $data)
    {
        $customFields = null;
        if (isset($data['custom_fields']) && is_array($data['custom_fields'])) {
            $customFields = $data['custom_fields'];
            $data['custom_fields'] = json_encode($data['custom_fields']);
        }

        parent::update($id, $data);

        if (is_array($customFields)) {
            $this->db->delete(
                $this->db->prefix . 'wolf_event_participants_fields',
                [$this->primaryKey => $id, 'event_id' => $data['event_id']]
            );

            foreach ($data['custom_fields'] as $fieldKey => $fieldValue) {
                $this->db->insert(
                    $this->db->prefix . 'wolf_event_participants_fields',
                    [
                        'participant_id' => $id,
                        'event_id' => $data['event_id'],
                        'field_name' => $fieldKey,
                        'field_value' => is_array($fieldValue) ? json_encode($fieldValue) : $fieldValue,
                    ]
                );
            }
        }
    }
}
