<?php

namespace Wolf\Event\Domain\UseCase;

use Wolf\Core\DependencyInjection\ContainerAwareInterface;
use Wolf\Core\DependencyInjection\ContainerAwareTrait;
use Wolf\Core\Domain\UseCase\UseCaseInterface;
use Wolf\Event\Domain\Repository\ParticipantRepository;

class UpdateParticipantUseCase implements UseCaseInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * @var ParticipantRepository
     */
    private $participantRepository;

    public function getParticipantRepository()
    {
        if (!$this->participantRepository) {
            $this->participantRepository = $this->container->get('wolf-event.repository.participant');
        }
        return $this->participantRepository;
    }

    public function setParticipantRepository(ParticipantRepository $participantRepository)
    {
        $this->participantRepository = $participantRepository;
    }

    public function execute(array $data = array())
    {
        if (!isset($data['id'])) {
            throw new \InvalidArgumentException('Event ID is required to update an event.');
        }

        // Logic to update an event
        $participantId = $data['id'];
        // Assume we have a repository to handle participant data
        $participantRepository = $this->getParticipantRepository();
        $participantRepository->update($participantId, $data['data']);
        return $participantRepository->findById($participantId);
    }
}
