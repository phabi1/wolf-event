<?php

namespace Wolf\Event;

class Api
{
    public function setup()
    {
        $routes = new Api\Routes();
        $routes->setup();
    }
}
