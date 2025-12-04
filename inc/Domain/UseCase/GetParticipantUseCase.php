<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;

class GetParticipantUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use ContainerTrait;
    
    private $participantRepository;

    public function getParticipantRepository()
    {
        if (!$this->participantRepository) {
            $this->participantRepository = $this->container->get('wolf-event.repository.participant');
        }
        return $this->participantRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required');
        }
        $participantId = $data['id'];

        $participantRepository = $this->getParticipantRepository();
        $participant = $participantRepository->findById($participantId);

        return $participant;
    }
}
