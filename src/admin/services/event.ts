import { api } from "./api";
import { Event } from "../models/event.model";

export async function list(): Promise<{ items: Event[]; total: number }> {
	const res = await api.get<{ items: Event[]; total: number }>(
		"/wolf-event/v1/events",
	);
	return res.data;
}

export async function getById(id: string) {
	const res = await api.get<Event>(`/wolf-event/v1/events/${id}`);
	return res.data;
}

export async function save(event: Partial<Event>) {
	if (event.id) {
		await api.put(`/wolf-event/v1/events/${event.id}`, event);
	} else {
		await api.post("/wolf-event/v1/events", event);
	}
}

export async function deleteById(id: string) {
	await api.delete(`/wolf-event/v1/events/${id}`);
}

export async function getParticipants(
	eventId: string,
): Promise<{ items: any[]; total: number }> {
	const res = await api.get<{ items: any[]; total: number }>(
		`/wolf-event/v1/events/${eventId}/participants`,
	);
	return res.data;
}

export async function getParticipantById(eventId: string, participantId: string) {
	const res = await api.get<any>(
		`/wolf-event/v1/events/${eventId}/participants/${participantId}`,
	);
	return res.data;
}

export async function saveParticipant(
	eventId: string,
	participant: Partial<any>,
) {
	if (participant.id) {
		await api.put(
			`/wolf-event/v1/events/${eventId}/participants/${participant.id}`,
			participant,
		);
	} else {
		await api.post(
			`/wolf-event/v1/events/${eventId}/participants`,
			participant,
		);
	}
}

export async function deleteParticipantById(
	eventId: string,
	participantId: string,
) {
	await api.delete(
		`/wolf-event/v1/events/${eventId}/participants/${participantId}`,
	);
}

export const eventService = {
	list,
	getById,
	save,
	deleteById,
	getParticipants,
	getParticipantById,
	saveParticipant,
	deleteParticipantById,
};