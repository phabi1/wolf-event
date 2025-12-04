import { createContext, useState } from "react";

type EventData = {
	tickets: any[];
	participants: any[];
	contactInfo?: any;
};

export type EventContextType = {
	event: any;
	data: EventData;
	setEvent?: (event: any) => void;
	setData?: (data: Partial<EventData>) => void;
};

export const EventContext = createContext<EventContextType>({
	event: null,
	data: {
		tickets: [],
		participants: [],
		contactInfo: null,
	},
	setEvent: (event: any) => {},
	setData: (data: Partial<EventData>) => {},
});

export const EventContextProvider = (props: any) => {
	const setEvent = (event: any) => {
		setState((prevState) => ({
			...prevState,
			event: event,
		}));
	};

	const setData = (data: Partial<EventData>) => {
		setState((prevState) => ({
			...prevState,
			data: {
				...prevState.data,
				...data,
			},
		}));
	};

	const initialState: EventContextType = {
		event: null,
		data: {
			tickets: [],
			participants: [],
			contactInfo: null,
		},
		setEvent: setEvent,
		setData: setData,
	};

	const [state, setState] = useState<EventContextType>(initialState);
	return (
		<EventContext.Provider value={state}>
			{props.children}
		</EventContext.Provider>
	);
};
