import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../contexts/event";

type Participant = {
	firstname: string;
	email: string;
};

export default function ParticipantsPage() {
	const eventContext = useContext(EventContext);
	const [participants, setParticipants] = useState<Array<Participant>>([]);

	useEffect(() => {
		// In real scenario, fetch participants from eventContext or API
		if (eventContext && eventContext.participants) {
			setParticipants(eventContext.participants);
		}
	}, [eventContext]);

	return (
		<div>
			<div>
				{participants.length === 0 ? (
					<p>No participants found.</p>
				) : (
					<ul>
						{participants.map((participant: Participant, index: number) => (
							<li key={index}>{participant.firstname}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
