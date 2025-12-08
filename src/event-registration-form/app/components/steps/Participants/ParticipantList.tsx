import { Participant } from "../../../models/participant.model";
import { ParticipantItem } from "./ParticipantItem";

export interface ParticipantListProps {
	participants: Array<Participant>;
	fields: Array<any>;
	onParticipantsChange: (participants: Array<Participant>) => void;
}

export default function ParticipantList({
	participants,
	fields,
	onParticipantsChange,
}: ParticipantListProps) {
	const handleParticipantsChange = (event: any, index: number) => {
		const updatedParticipants = [...participants];
		updatedParticipants[index] = {
			...updatedParticipants[index],
			...event,
		};
		onParticipantsChange(updatedParticipants);
	};

	return (
		<div className="participant-list">
			{participants.map((participant, index) => (
				<ParticipantItem
					title={"Participant " + (index + 1)}
					key={index}
					onParticipantChange={(event) =>
						handleParticipantsChange(event, index)
					}
					fields={fields}
				/>
			))}
		</div>
	);
}
