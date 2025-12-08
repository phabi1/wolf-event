import { createContext } from "react";
import { Participant } from "../models/participant.model";
import { Ticket } from "../models/ticket.model";

export type DataContextInfo = {
	tickets: Array<Ticket>;
	participants: Array<Participant>;
	contactInfo: any;
};

export type DataContextType = {
	data: DataContextInfo;
	setData: (data: any) => void;
};

export const DataContext = createContext<DataContextType>({
	data: {
		tickets: [],
		participants: [],
		contactInfo: null,
	},
	setData: () => {},
});
