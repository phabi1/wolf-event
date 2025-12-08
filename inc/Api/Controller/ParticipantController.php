<?php

namespace Wolf\Event\Api\Controller;

use Wolf\Core\Api\Controller\AbstractController;
use Wolf\Core\Domain\UseCase\UseCaseBus;

class ParticipantController extends AbstractController
{
    private $useCaseBus;

    /**
     * Get the UseCaseBus service.
     * @return UseCaseBus
     */
    public function getUseCaseBus()
    {
        if (!$this->useCaseBus) {
            $this->useCaseBus = $this->getService('wolf-core.use-case-bus');
        }
        return $this->useCaseBus;
    }

    public function itemsAction($request)
    {
        $options = [
            'event_id' => $request['eventId']
        ];
        if (isset($request['page'])) {
            $options['page'] = (int) $request['page'];
        }
        if (isset($request['size'])) {
            $options['size'] = (int) $request['size'];
        }

        $res = $this->getUseCaseBus()->execute('list_participants', $options);
        return $res;
    }

    public function item($request)
    {
        $id = $request['id'];

        $item = $this->getUseCaseBus()->execute('get_participant', ['id' => $id]);
        if (!$item) {
            throw new \WP_Error('wolf_event_not_found', 'Event not found', ['status' => 404]);
        }
        return $item;
    }

    public function create($request)
    {
        $eventId = $request['eventId'];
        $data = $request->get_params();

        $res = $this->getUseCaseBus()->execute('create_participant', [
            'event_id' => $eventId,
            'data' => $data
        ]);
        return $res;
    }

    public function update($request)
    {
        $eventId = $request['eventId'];
        $id = $request['id'];
        $data = $request['data'];

        $res = $this->getUseCaseBus()->execute('update_participant', [
            'event_id' => $eventId,
            'id' => $id,
            'data' => $data
        ]);
        return $res;
    }

    public function remove($request)
    {
        $eventId = $request['eventId'];
        $id = $request['id'];
        $res = $this->getUseCaseBus()->execute('remove_participant', [
            'event_id' => $eventId,
            'id' => $id
        ]);
        return $res;
    }
}
