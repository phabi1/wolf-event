import { createContext } from "react";

export type EventContextType = {
	prices: Array<{ name: string; amount: number }>;
	participant_fields: Array<string>;
};

export const EventContext = createContext<EventContextType | null>(null);
