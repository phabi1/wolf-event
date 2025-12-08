import { useEffect, useMemo, useState } from "react";
import ContactStep from "./components/steps/ContactStep";
import ParticipantsStep from "./components/steps/ParticipantsStep";
import SummaryStep from "./components/steps/SummaryStep";
import TicketsStep from "./components/steps/TicketsStep";
import Stepper from "./components/ui/Stepper";
import { DataContext, DataContextInfo } from "./contexts/data";
import { EventContext } from "./contexts/event";

export default function App() {
	const [event, setEvent] = useState<any>(null);
	const [data, setData] = useState<DataContextInfo>({
		tickets: [],
		participants: [],
		contactInfo: {},
	});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		const fetchEventData = async (eventId: string) => {
			try {
				setLoading(true);
				const response = await fetch(
					"/wp-json/wolf-event/v1/events/" + eventId + "/registration",
				);
				const event = await response.json();
				setEvent(event);

				if (event.registration_status !== "open") {
					if (event.registration_status === "closed")
						setError("registration_closed");
					else if (event.registration_status === "upcoming")
						setError("registration_upcoming");
					else setError("registration_not_available");
					return;
				}
			} catch (error) {
				console.error("Error fetching event data:", error);
			} finally {
				setLoading(false);
			}
		};

		const urlParams = new URLSearchParams(window.location.search);
		const eventId = urlParams.get("event_id");
		if (eventId) {
			fetchEventData(eventId);
		} else {
			console.error("No event_id provided in URL.");
			setLoading(false);
			setError("no_event_id");
		}
	}, []);

	useEffect(() => {
		if (event) {
			const initialTickets = event.prices.map((price: any) => ({
				name: price.name,
				count: 0,
			}));
			setData((prevData: any) => ({
				...prevData,
				tickets: initialTickets,
			}));
		}
	}, [event]);

	const EventError = useMemo(() => {
		if (error === "registration_closed") {
			return (
				<div>
					<p>
						Registration is closed.
						{event?.registration_closing_date && (
							<span>
								{" "}
								It closed on{" "}
								{new Date(event.registration_closing_date).toLocaleDateString()}
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
						{event?.registration_opening_date && (
							<span>
								{" "}
								It opens on{" "}
								{new Date(event.registration_opening_date).toLocaleDateString()}
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
		} else if (error === "no_event_id") {
			return (
				<div>
					<p>No event ID provided in the URL.</p>
				</div>
			);
		}
		return <div>An error occurred.</div>;
	}, [error, event]);

	return (
		<div>
			<EventContext.Provider value={event}>
				{loading ? (
					<div>Loading...</div>
				) : (
					<>
						<h1>Registration for {event?.title}</h1>
						{error ? (
							EventError
						) : (
							<DataContext.Provider value={{ data, setData }}>
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
									<Stepper.Step label="Summary">
										<SummaryStep></SummaryStep>
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
