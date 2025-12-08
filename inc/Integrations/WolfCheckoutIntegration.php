<?php

namespace Wolf\Event\Integrations;

class WolfCheckoutIntegration
{
    public function integrate()
    {
        add_action('wolf_checkout_process_order', array($this, 'processOrder'), 10, 2);
    }

    public function processOrder($orderId, $orderData)
    {
        // Handle the order processing related to the event plugin here.
    }
}
