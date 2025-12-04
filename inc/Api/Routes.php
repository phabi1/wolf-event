<?php

namespace Wolf\Event\Api;

use Wolf\Core\Api\Router;
use Wolf\Core\DependencyInjection\Container;
use Wolf\Event\Api\Controller\EventController;
use Wolf\Event\Api\Controller\ParticipantController;

class Routes
{
    public function setup()
    {
        $router = Container::getInstance()->create(Router::class);
        $router->setNamespace('wolf-event/v1');
        $router->setRoutes([
            [
                'methods' => 'GET',
                'path' => '/events',
                'controller' => EventController::class,
                'action' => 'items',
            ],
            [
                'methods' => 'GET',
                'path' => '/events/(?P<id>\d+)',
                'controller' => EventController::class,
                'action' => 'item',
            ],
            [
                'methods' => 'POST',
                'path' => '/events',
                'controller' => EventController::class,
                'action' => 'create',
            ],
            [
                'methods' => 'PUT',
                'path' => '/events/(?P<id>\d+)',
                'controller' => EventController::class,
                'action' => 'update',
            ],
            [
                'methods' => 'DELETE',
                'path' => '/events/(?P<id>\d+)',
                'controller' => EventController::class,
                'action' => 'remove',
            ],
            [
                'methods' => 'GET',
                'path' => '/events/(?P<eventId>\d+)/participants',
                'controller' => ParticipantController::class,
                'action' => 'items',
            ],
            [
                'methods' => 'GET',
                'path' => '/events/(?P<eventId>\d+)/participants/(?P<id>\d+)',
                'controller' => ParticipantController::class,
                'action' => 'item',
            ],
            [
                'methods' => 'POST',
                'path' => '/events/(?P<eventId>\d+)/participants',
                'controller' => ParticipantController::class,
                'action' => 'create',
            ],
            [
                'methods' => 'PUT',
                'path' => '/events/(?P<eventId>\d+)/participants/(?P<id>\d+)',
                'controller' => ParticipantController::class,
                'action' => 'update',
            ],
            [
                'methods' => 'DELETE',
                'path' => '/events/(?P<eventId>\d+)/participants/(?P<id>\d+)',
                'controller' => ParticipantController::class,
                'action' => 'remove',
            ],
            [
                'methods' => 'GET',
                'path' => '/events/(?P<id>\d+)/registration',
                'controller' => EventController::class,
                'action' => 'registration',
            ],
            [
                'methods' => 'POST',
                'path' => '/events/(?P<id>\d+)/register',
                'controller' => EventController::class,
                'action' => 'register',
            ],
        ]);
        $router->build();
    }
}
