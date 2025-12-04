export interface Event {
	id: string;
	title: string;
	registration_start: Date | null;
	registration_end: Date | null;
	event_start: Date | null;
	event_end: Date | null;
	participant_max: number;
	participant_count: number;
	participant_fields: any[];
	settings: Record<string, any>;
}
