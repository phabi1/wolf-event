<?php

namespace Wolf\Event;

use Wolf\Core\DependencyInjection\Container;
use Wolf\Event\Domain\Repository\EventRepository;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class Plugin
{
    public function bootstrap()
    {
        \add_action('init', [new Blocks(), 'setup']);
        \add_action('rest_api_init', [new Api(), 'setup']);
        \add_action('admin_menu', [new Admin(), 'setup']);

        add_action('plugins_loaded', function () {
            // Load integration with Wolf Checkout plugin.
            if (class_exists('Wolf\Checkout\Plugin')) {
                new Integrations\WolfCheckoutIntegration();
            }
        });


        $container = Container::getInstance();
        $container->setType('wolf-event.repository.event', EventRepository::class);
        $container->setType('wolf-event.repository.participant', ParticipantRepository::class);
    }
}
