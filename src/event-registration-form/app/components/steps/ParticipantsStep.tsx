import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/data";
import { EventContext, type EventContextType } from "../../contexts/event";
import { Participant } from "../../models/participant.model";
import ParticipantList from "./Participants/ParticipantList";

export default function ParticipantsStep() {
	const eventContext = useContext<EventContextType | null>(EventContext);
	const dataContext = useContext(DataContext);
	const [participants, setParticipants] = useState<Array<Participant>>([]);

	useEffect(() => {
		if (dataContext && dataContext.data.tickets) {
			setParticipants(
				dataContext.data.tickets.map((ticket) => ({
					firstname: "",
					lastname: "",
					customFields: {},
				})),
			);
		}
	}, [dataContext]);

	return (
		<div>
			<div>
				{participants.length === 0 ? (
					<p>No participants found.</p>
				) : (
					<ParticipantList
						participants={participants}
						fields={eventContext?.participant_fields || []}
						onParticipantsChange={setParticipants}
					/>
				)}
			</div>
		</div>
	);
}
