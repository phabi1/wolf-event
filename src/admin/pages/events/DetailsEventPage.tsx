import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import ParticipantList from "../../components/event/details/ParticipantList";
import * as eventService from "../../services/event";
import Button from "@mui/material/Button";

export default function DetailsEventPage() {
	const params = useParams();

	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState<any>(null);
	const [participants, setParticipants] = useState<any[]>([]);

	useEffect(() => {
		const fetchEventDetails = async () => {
			setLoading(true);
			const eventId = params.eventId;
			const event = await eventService.getById(eventId!);
			const res = await eventService.getParticipants(eventId!);

			setEvent(event);
			setParticipants(res.items);
			setLoading(false);
		};

		fetchEventDetails();
	}, [params.id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="wrap">
			<div>
				<Link to="/">Back to Events List</Link>
				<h1>{event?.title}</h1>
				<Button
					component={Link}
					to={`/${event?.id}/edit`}
					variant="contained"
					color="primary"
				>
					Edit Event
				</Button>
			</div>
			<Paper>
				<p>{event?.description}</p>
				<p>Start Date: {event?.event_start}</p>
				<p>End Date: {event?.event_end}</p>
				<p>Location: {event?.location}</p>
			</Paper>

			<h2>Prices</h2>
			<Paper>
				<ul>
					{event?.prices?.map((price: any, index: number) => (
						<li key={index}>
							{price.label}: {price.amount} {price.currency}
						</li>
					))}
				</ul>
			</Paper>
			<h2>
				Participants ({event?.participant_count + "/" + event?.participant_max})
			</h2>
			<ParticipantList
				eventId={event?.id}
				participants={participants}
			></ParticipantList>
			<Outlet />
		</div>
	);
}
