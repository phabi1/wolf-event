import { useEffect, useState, useContext, useMemo } from "react";
import ContactStep from "./components/steps/ContactStep";
import ParticipantsStep from "./components/steps/ParticipantsStep";
import TicketsStep from "./components/steps/TicketsStep";
import Stepper from "./components/ui/Stepper";
import { EventContext } from "./contexts/event";
import { DataContext } from "./contexts/data";

export default function App() {
	const eventContext = useContext<any>(EventContext);
	const dataContext = useContext<any>(DataContext);

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
			} catch (error) {
				console.error("Error fetching event data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEventData();
	}, []);

	const EventError = useMemo(() => {
		if (error === "registration_closed") {
			return (
				<div>
					<p>
						Registration is closed.
						{eventContext?.registration_closing_date && (
							<span>
								{" "}
								It closed on{" "}
								{new Date(
									eventContext.registration_closing_date,
								).toLocaleDateString()}
								.
							</span>
						)}
					</p>
				</div>
			);
		} else if (error === "registration_upcoming") {
			return (
				<div>
					<p>
						Registration is not yet open.
						{eventContext?.registration_opening_date && (
							<span>
								{" "}
								It opens on{" "}
								{new Date(
									eventContext.registration_opening_date,
								).toLocaleDateString()}
								.
							</span>
						)}
					</p>
				</div>
			);
		} else if (error === "registration_not_available") {
			return (
				<div>
					<p>Registration is not available.</p>
				</div>
			);
		}
		return <div>An error occurred.</div>;
	}, [error, eventContext]);

	return (
		<div>
			<EventContext.Provider value={eventContext}>
				{loading ? (
					<div>Loading...</div>
				) : (
					<>
						<h1>Registration for {eventContext?.title}</h1>
						{error ? (
							EventError
						) : (
							<DataContext.Provider value={dataContext}>
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
							</DataContext.Provider>
						)}
					</>
				)}
			</EventContext.Provider>
		</div>
	);
}
