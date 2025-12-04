import { createHashRouter, Form, RouterProvider } from "react-router";
import ListEventPage from "../pages/events/ListEventPage";
import FormEventPage from "../pages/events/FormEventPage";
import DetailsEventPage from "../pages/events/DetailsEventPage";
import FormParticipantPage from "../pages/events/participants/FormParticipantPage";
import RemoveParticipantPage from "../pages/events/participants/RemoveParticipentPage";

export const router = createHashRouter([
	{
		path: "/",
		Component: ListEventPage,
	},
	{
		path: "/add",
		Component: FormEventPage,
	},
	{
		path: "/:eventId",
		Component: DetailsEventPage,
		children: [
			{
				path: "participants/add",
				Component: FormParticipantPage,
			},
			{
				path: "participants/:participantId/edit",
				Component: FormParticipantPage,
			},
			{
				path: "participants/:participantId/delete",
				Component: RemoveParticipantPage,
			},
		],
	},
	{
		path: "/:eventId/edit",
		Component: FormEventPage,
	},
]);
