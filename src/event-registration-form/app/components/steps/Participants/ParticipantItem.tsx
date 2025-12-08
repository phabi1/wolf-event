import ParticipantField from "./ParticipantField";

export type ParticipantItemProps = {
	title: string;
	onParticipantChange?: (updatedParticipant: any) => void;
	fields: Array<any>;
};

export function ParticipantItem({
	title,
	fields,
	onParticipantChange,
}: ParticipantItemProps) {
	return (
		<div className="participant-item">
			<div className="participant-item-header">{title}</div>
			<div className="participant-item-fields">
				<div>
					<label>First Name</label>
					<input
						type="text"
						onChange={(e) => {
							if (onParticipantChange) {
								onParticipantChange({
									firstname: e.target.value,
								});
							}
						}}
					/>
				</div>
				<div>
					<label>Last Name</label>
					<input
						type="text"
						onChange={(e) => {
							if (onParticipantChange) {
								onParticipantChange({
									lastname: e.target.value,
								});
							}
						}}
					/>
				</div>
				{fields.map((field, index) => (
					<ParticipantField key={index} />
				))}
			</div>
		</div>
	);
}
