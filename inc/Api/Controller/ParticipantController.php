<?php

namespace Wolf\Event\Api\Controller;

use Wolf\Core\Api\Controller\AbstractController;
use Wolf\Core\Domain\UseCase\UseCaseBus;
use Wolf\Event\Domain\UseCase\CreateParticipantUseCase;
use Wolf\Event\Domain\UseCase\GetParticipantUseCase;
use Wolf\Event\Domain\UseCase\ListParticipantUseCase;
use Wolf\Event\Domain\UseCase\RemoveParticipantUseCase;
use Wolf\Event\Domain\UseCase\UpdateParticipantUseCase;

class ParticipantController extends AbstractController
{
    private $useCaseBus;

    public function getUseCaseBus()
    {
        if (!$this->useCaseBus) {
            $this->useCaseBus = $this->getService(UseCaseBus::class);
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

        $res = $this->getUseCaseBus()->execute(ListParticipantUseCase::class, $options);
        return $res;
    }

    public function item($request)
    {
        $id = $request['id'];

        $item = $this->getUseCaseBus()->execute(GetParticipantUseCase::class, ['id' => $id]);
        if (!$item) {
            throw new \WP_Error('wolf_event_not_found', 'Event not found', ['status' => 404]);
        }
        return $item;
    }

    public function create($request)
    {
        $eventId = $request['eventId'];
        $data = $request->get_params();

        $res = $this->getUseCaseBus()->execute(CreateParticipantUseCase::class, [
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

        $res = $this->getUseCaseBus()->execute(UpdateParticipantUseCase::class, [
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
        $res = $this->getUseCaseBus()->execute(RemoveParticipantUseCase::class, [
            'event_id' => $eventId,
            'id' => $id
        ]);
        return $res;
    }
}
