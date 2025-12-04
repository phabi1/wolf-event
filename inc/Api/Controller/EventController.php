<?php

namespace Wolf\Event\Api\Controller;

use Wolf\Core\Api\Controller\AbstractController;
use Wolf\Core\Domain\UseCase\UseCaseBus;
use Wolf\Event\Domain\UseCase\CreateEventUseCase;
use Wolf\Event\Domain\UseCase\GetEventUseCase;
use Wolf\Event\Domain\UseCase\ListEventUseCase;
use Wolf\Event\Domain\UseCase\RegisterToEventUseCase;
use Wolf\Event\Domain\UseCase\RegistrationFromEventUseCase;
use Wolf\Event\Domain\UseCase\RemoveEventUseCase;
use Wolf\Event\Domain\UseCase\UpdateEventUseCase;

class EventController extends AbstractController
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
        $pagination = [];
        if (isset($request['page'])) {
            $pagination['page'] = (int) $request['page'];
        }
        if (isset($request['size'])) {
            $pagination['size'] = (int) $request['size'];
        }

        $res = $this->getUseCaseBus()->execute(ListEventUseCase::class, $pagination);
        return $res;
    }

    public function item($request)
    {
        $id = $request['id'];

        $item = $this->getUseCaseBus()->execute(GetEventUseCase::class, ['id' => $id]);
        if (!$item) {
            throw new \WP_Error('wolf_event_not_found', 'Event not found', ['status' => 404]);
        }
        return $item;
    }

    public function create($request)
    {
        $data = $request->get_params();

        $res = $this->getUseCaseBus()->execute(CreateEventUseCase::class, ['data' => $data]);
        return $res;
    }

    public function update($request)
    {
        $id = $request['id'];
        $data = $request['data'];

        $res = $this->getUseCaseBus()->execute(UpdateEventUseCase::class, ['id' => $id, 'data' => $data]);
        return $res;
    }

    public function remove($request)
    {
        $id = $request['id'];
        $res = $this->getUseCaseBus()->execute(RemoveEventUseCase::class, ['id' => $id]);
        return $res;
    }

    public function registration($request)
    {
        $id = $request['id'];

        $res = $this->getUseCaseBus()->execute(RegistrationFromEventUseCase::class, ['id' => $id]);
        return $res;
    }

    public function register($request)
    {
        $data = $request->get_params();

        $res = $this->getUseCaseBus()->execute(RegisterToEventUseCase::class, $data);
        return $res;
    }
}
