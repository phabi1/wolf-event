<?php

namespace Wolf\Event\Api\Controller;

use Wolf\Core\Api\Controller\AbstractController;
use Wolf\Core\Domain\UseCase\UseCaseBus;

class EventController extends AbstractController
{
    private $useCaseBus;

    /**
     * Get the UseCaseBus service.
     * @return UseCaseBus
     */
    public function getUseCaseBus(): UseCaseBus
    {
        if (!$this->useCaseBus) {
            $this->useCaseBus = $this->getService('wolf-core.use-case-bus');
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

        $res = $this->getUseCaseBus()->execute('list_events', $pagination);
        return $res;
    }

    public function item($request)
    {
        $id = $request['id'];

        $item = $this->getUseCaseBus()->execute('get_event', ['id' => $id]);
        if (!$item) {
            throw new \WP_Error('wolf_event_not_found', 'Event not found', ['status' => 404]);
        }
        return $item;
    }

    public function create($request)
    {
        $data = $request->get_params();

        $res = $this->getUseCaseBus()->execute('create_event', ['data' => $data]);
        return $res;
    }

    public function update($request)
    {
        $id = $request['id'];
        $data = $request['data'];

        $res = $this->getUseCaseBus()->execute('update_event', ['id' => $id, 'data' => $data]);
        return $res;
    }

    public function remove($request)
    {
        $id = $request['id'];
        $res = $this->getUseCaseBus()->execute('remove_event', ['id' => $id]);
        return $res;
    }

    public function registration($request)
    {
        $id = $request['id'];

        $res = $this->getUseCaseBus()->execute(
            "registration_from_event",
            ['id' => $id]
        );
        return $res;
    }

    public function register($request)
    {
        $data = $request->get_params();

        $res = $this->getUseCaseBus()->execute('register_to_event', $data);
        return $res;
    }
}
