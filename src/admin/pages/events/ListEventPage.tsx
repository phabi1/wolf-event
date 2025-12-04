import {
	DataGrid,
	GridActionsCell,
	GridActionsCellItem,
	GridColDef,
	GridRowId,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as eventService from "../../services/event";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";

const ActionsHandlersContext = createContext<{
	viewEvent: (id: GridRowId) => void;
	editEvent: (id: GridRowId) => void;
}>({
	viewEvent: (id: GridRowId) => {},
	editEvent: (id: GridRowId) => {},
});

function ActionsCell(props: any) {
	const { editEvent, viewEvent } = useContext(ActionsHandlersContext);
	return (
		<GridActionsCell {...props}>
			<GridActionsCellItem
				icon={<EditIcon />}
				label="View"
				onClick={() => viewEvent(props.id)}
			></GridActionsCellItem>
			<GridActionsCellItem
				icon={<EditIcon />}
				label="Edit"
				onClick={() => editEvent(props.id)}
			></GridActionsCellItem>
		</GridActionsCell>
	);
}

export default function ListEventPage() {
	const navigate = useNavigate();

	const columns: GridColDef[] = [
		{
			field: "title",
			headerName: "Title",
			width: 250,
		},
		{
			field: "event_start",
			headerName: "Start Date",
			width: 150,
		},
		{
			field: "event_end",
			headerName: "End Date",
			width: 150,
		},
		{
			field: "participant_count",
			headerName: "Participants",
			width: 150,
			valueGetter: (value, row) => {
				return value + " / " + row.participant_max;
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 150,
			type: "actions",
			renderCell: (params) => <ActionsCell {...params} />,
		},
	];

	const [rows, setRows] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await eventService.list();
			setRows(data.items);
		};

		fetchData();
	}, []);

	const paginationModel = { pageSize: 5, page: 0 };

	const actionsHandlers = useMemo(
		() => ({
			viewEvent: (id: GridRowId) => {
				// Navigate to view page
				navigate(`/${id}`);
			},
			editEvent: (id: GridRowId) => {
				// Navigate to edit page
				navigate(`/${id}/edit`);
			},
		}),
		[],
	);

	return (
		<div className="wrap">
			<h1>Events List</h1>
			<Button
				component={Link}
				to="/add"
				variant="contained"
				color="primary"
				sx={{ mb: 2 }}
			>
				Add New Event
			</Button>
			<Paper sx={{ height: 400, width: "100%" }}>
				<ActionsHandlersContext.Provider value={actionsHandlers}>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[5, 10]}
						sx={{ border: 0 }}
					/>
				</ActionsHandlersContext.Provider>
			</Paper>
		</div>
	);
}
