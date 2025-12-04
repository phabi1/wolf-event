import { useEffect, useState, useContext } from "react";
import ContactStep from "./components/steps/ContactStep";
import ParticipantsStep from "./components/steps/ParticipantsStep";
import TicketsStep from "./components/steps/TicketsStep";
import Stepper from "./components/ui/Stepper";
import {
	EventContext,
	EventContextProvider,
	EventContextType,
} from "./contexts/event";

export default function App() {
	const state = useContext<EventContextType>(EventContext);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	const eventID = 3; // Example event ID

	useEffect(() => {
		const fetchEventData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"/wp-json/wolf-event/v1/events/" + eventID + "/registration",
				);
				const event = await response.json();

				if (event.registration_status !== "open") {
					if (event.registration_status === "closed")
						setError("registration_closed");
					else if (event.registration_status === "upcoming")
						setError("registration_upcoming");
					else setError("registration_not_available");
					return;
				}

				const tickets = event.prices.map((price: any) => ({
					name: price.name,
					count: 0,
				}));

console.log(event);

				state.setEvent && state.setEvent(event);
				state.setData &&
					state.setData({
						tickets: tickets,
						participants: [],
						contactInfo: null,
					});
			} catch (error) {
				console.error("Error fetching event data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEventData();
	}, []);

	return (
		<div>
			<EventContextProvider>
				{loading ? (
					<div>Loading...</div>
				) : (
					<>
						<h1>Registration for {state.event?.title}</h1>
						{error ? (
							<div>
								{error === "registration_closed" && (
									<p>
										Registration is closed.
										{state.event?.registration_closing_date && (
											<span>
												{" "}
												It closed on{" "}
												{new Date(
													state.event.registration_closing_date,
												).toLocaleDateString()}
												.
											</span>
										)}
									</p>
								)}
								{error === "registration_upcoming" && (
									<p>
										Registration is not yet open.
										{state.event?.registration_opening_date && (
											<span>
												{" "}
												It opens on{" "}
												{new Date(
													state.event.registration_opening_date,
												).toLocaleDateString()}
												.
											</span>
										)}
									</p>
								)}
								{error === "registration_not_available" && (
									<p>Registration is not available.</p>
								)}
							</div>
						) : (
							<Stepper>
								<Stepper.Step label="Tickets">
									<TicketsStep></TicketsStep>
								</Stepper.Step>
								<Stepper.Step label="Participants">
									<ParticipantsStep></ParticipantsStep>
								</Stepper.Step>
								<Stepper.Step label="Contact">
									<ContactStep></ContactStep>
								</Stepper.Step>
							</Stepper>
						)}
					</>
				)}
			</EventContextProvider>
		</div>
	);
}
