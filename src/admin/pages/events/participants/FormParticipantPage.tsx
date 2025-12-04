import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { eventService } from "../../../services/event";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function FormParticipantPage() {
	const params = useParams();
	const navigate = useNavigate();

	const [open, setOpen] = useState(true);
	const [data, setData] = useState<Partial<any>>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [event, setEvent] = useState<any>(null);
	const [fields, setFields] = useState<any[]>([]);

	useEffect(() => {
		const fetchParticipantData = async () => {
			setLoading(true);
			try {
				const eventData = await eventService.getById(params.eventId!);
				setEvent(eventData);
				setFields(eventData.participant_fields || []);
				if (params.participantId) {
					const participant = await eventService.getParticipantById(
						params.eventId!,
						params.participantId,
					);
					setData(participant);
				} else {
					setData({
						firstname: "",
						lastname: "",
						email: "",
						status: "pending",
					});
				}
			} catch (err: any) {
				setError(err.message || "Failed to load participant data.");
			} finally {
				setLoading(false);
			}
		};

		fetchParticipantData();
	}, []);

	const handleSave = async () => {
		setLoading(true);
		try {
			await eventService.saveParticipant(params.eventId!, data);
			handleClose();
		} catch (err: any) {
			setError(err.message || "Failed to save participant.");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		handleClose();
	};

	const handleClose = () => {
		navigate(-1); // Go back on close
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Participant Form</DialogTitle>
			<DialogContent>
				{loading ? (
					<div>Loading...</div>
				) : error ? (
					<div style={{ color: "red" }}>{error}</div>
				) : (
					<form noValidate autoComplete="off" onSubmit={handleSave}>
						<TextField
							name="firstname"
							label="Firstname"
							required
							value={data.firstname}
							onChange={(e) => setData({ ...data, firstname: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<TextField
							name="lastname"
							label="Lastname"
							required
							value={data.lastname}
							onChange={(e) => setData({ ...data, lastname: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<TextField
							name="email"
							label="Email"
							required
							value={data.email}
							onChange={(e) => setData({ ...data, email: e.target.value })}
							fullWidth
							margin="normal"
						/>
						<Select
							value={data.status || "pending"}
							onChange={(e) => setData({ ...data, status: e.target.value })}
							label="Status"
							fullWidth
						>
							<MenuItem value={"pending"}>Pending</MenuItem>
							<MenuItem value={"done"}>Confirmed</MenuItem>
						</Select>
						{fields.map((field) => {
							switch (field.type) {
								case "text":
									return (
										<TextField
											key={field.name}
											name={field.name}
											label={field.label}
											required={field.required}
											value={data[field.name] || ""}
											onChange={(e) =>
												setData({ ...data, [field.name]: e.target.value })
											}
											fullWidth
											margin="normal"
										/>
									);
								case "number":
									return (
										<TextField
											key={field.name}
											name={field.name}
											label={field.label}
											type="number"
											required={field.required}
											value={data[field.name] || ""}
											onChange={(e) =>
												setData({ ...data, [field.name]: e.target.value })
											}
											fullWidth
											margin="normal"
										/>
									);
								case "date":
									return (
										<TextField
											key={field.name}
											name={field.name}
											label={field.label}
											type="date"
											required={field.required}
											InputLabelProps={{
												shrink: true,
											}}
											value={data[field.name] || ""}
											onChange={(e) =>
												setData({ ...data, [field.name]: e.target.value })
											}
											fullWidth
											margin="normal"
										/>
									);
								case "email":
									return (
										<TextField
											key={field.name}
											name={field.name}
											label={field.label}
											type="email"
											required={field.required}
											value={data[field.name] || ""}
											onChange={(e) =>
												setData({ ...data, [field.name]: e.target.value })
											}
											fullWidth
											margin="normal"
										/>
									);
								case "checkbox":
									return <Switch />;
								case "file":
									return (
										<input
											key={field.name}
											name={field.name}
											type="file"
											required={field.required}
											onChange={(e) =>
												setData({ ...data, [field.name]: e.target.files?.[0] })
											}
										/>
									);
								case "select":
									return <Select></Select>;
								default:
									return null;
							}
						})}
					</form>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSave}>Save</Button>
				<Button onClick={handleCancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}
