import Button from "@mui/material/Button";
import {
	DataGrid,
	GridActionsCell,
	GridActionsCellItem,
	GridColDef,
	GridRowId,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createContext, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import Paper from "@mui/material/Paper";

export interface ParticipantListProps {
	eventId?: string;
	participants?: any[];
}

const ActionsHandlersContext = createContext<{
	editParticipant: (eventId: GridRowId, id: GridRowId) => void;
	deleteParticipant: (eventId: GridRowId, id: GridRowId) => void;
}>({
	editParticipant: (eventId: GridRowId, id: GridRowId) => {},
	deleteParticipant: (eventId: GridRowId, id: GridRowId) => {},
});

function ActionsCell(props: any) {
	const { editParticipant, deleteParticipant } = useContext(
		ActionsHandlersContext,
	);
	return (
		<GridActionsCell {...props}>
			<GridActionsCellItem
				icon={<EditIcon />}
				label="Edit"
				onClick={() => editParticipant(props.eventId, props.id)}
			></GridActionsCellItem>
			<GridActionsCellItem
				icon={<DeleteIcon />}
				label="Delete"
				onClick={() => deleteParticipant(props.eventId, props.id)}
			></GridActionsCellItem>
		</GridActionsCell>
	);
}

export default function ParticipantList({
	eventId,
	participants,
}: ParticipantListProps) {
	const navigate = useNavigate();

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{ field: "firstname", headerName: "Firstname", width: 150 },
		{ field: "lastname", headerName: "Lastname", width: 150 },
		{ field: "email", headerName: "Email", width: 200 },
		{ field: "status", headerName: "Status", width: 150 },
		{
			field: "registered_at",
			type: "dateTime",
			headerName: "Registered At",
			width: 200,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 150,
			type: "actions",
			renderCell: (params) => <ActionsCell eventId={eventId} {...params} />,
		},
	];

	const actionsHandlers = useMemo(
		() => ({
			editParticipant: (eventId: GridRowId, id: GridRowId) => {
				navigate(`/${eventId}/participants/${id}/edit`);
			},
			deleteParticipant: (eventId: GridRowId, id: GridRowId) => {
				navigate(`/${eventId}/participants/${id}/delete`);
			},
		}),
		[],
	);

	return (
		<>
			<Button
				component={Link}
				to={`/${eventId}/participants/add`}
				variant="contained"
				color="primary"
			>
				Add participant
			</Button>
			<Paper>
				<ActionsHandlersContext.Provider value={actionsHandlers}>
					<DataGrid rows={participants || []} columns={columns} />
				</ActionsHandlersContext.Provider>
			</Paper>
		</>
	);
}
