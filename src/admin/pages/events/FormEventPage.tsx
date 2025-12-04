import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Prices from "../../components/event/form/field/Prices";
import ParticipantFields from "../../components/event/form/field/ParticipantFields";
import * as eventService from "../../services/event";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function FormEventPage() {
	const params = useParams();
	const [tabIndex, setTabIndex] = useState(0);
	const [title, setTitle] = useState("");
	const [item, setItem] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		// Simulate fetching data for edit mode
		const fetchEventData = async () => {
			setLoading(true);
			// Replace with actual data fetching logic
			const eventId = params.eventId;

			let data = null;

			if (eventId) {
				console.log("Edit Existing Event");
				const item = await eventService.getById(eventId); // Replace 1 with actual ID

				data = item;

				setTitle("Edit Event");
			} else {
				console.log("Create New Event");
				data = {
					title: "",
					event_start: new Date(),
					event_end: new Date(),
					participant_max: 0,
					participant_fields: [],
					prices: [],
				};
				setTitle("Create New Event");
			}

			setItem(null);
			setData(data);
			setLoading(false);
		};

		fetchEventData();
	}, []);

	const handleTabIndexChange = (
		event: React.SyntheticEvent,
		newValue: number,
	) => {
		setTabIndex(newValue);
	};

	const handlePriceAdded = () => {
		setData((prevData: any) => {
			const updatedPrices = [...prevData.prices, { name: "", amount: 0 }];
			return { ...prevData, prices: updatedPrices };
		});
	};

	const handlePriceChanged = (index: number, item: any) => {
		setData((prevData: any) => {
			const updatedPrices = prevData.prices.map((price: any, i: number) =>
				i === index ? item : price,
			);
			return { ...prevData, prices: updatedPrices };
		});
	};

	const handlePriceRemoved = (index: number) => {
		setData((prevData: any) => {
			const updatedPrices = prevData.prices.filter(
				(_: any, i: number) => i !== index,
			);
			return { ...prevData, prices: updatedPrices };
		});
	};

	const handleParticipantFieldAdded = (item: any) => {
		setData((prevData: any) => {
			const updatedFields = [...prevData.participant_fields, item];
			return { ...prevData, participant_fields: updatedFields };
		});
	};

	const handleParticipantFieldRemoved = (index: number) => {
		setData((prevData: any) => {
			const updatedFields = prevData.participant_fields.filter(
				(_: any, i: number) => i !== index,
			);
			return { ...prevData, participant_fields: updatedFields };
		});
	};

	const handleParticipantFieldChanged = (index: number, item: any) => {
		setData((prevData: any) => {
			const updatedFields = prevData.participant_fields.map(
				(field: any, i: number) => (i === index ? item : field),
			);
			return { ...prevData, participant_fields: updatedFields };
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await eventService.save(data);
	};

	if (loading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<div className="wrap">
			<Link to="/">&#8592; Back to Events List</Link>
			<h1>{title}</h1>
			<Button
				variant="contained"
				color="primary"
				sx={{ mt: 2 }}
				onClick={handleSubmit}
			>
				Save
			</Button>
			<Paper sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={tabIndex}
					onChange={handleTabIndexChange}
					aria-label="basic tabs example"
				>
					<Tab label="Informations" {...a11yProps(0)} />
					<Tab label="Prices" {...a11yProps(1)} />
					<Tab label="Participant" {...a11yProps(2)} />
				</Tabs>
				<CustomTabPanel value={tabIndex} index={0}>
					<Box component="form" noValidate autoComplete="off">
						<TextField
							label="Event Title"
							variant="outlined"
							fullWidth
							value={data.title || ""}
							onChange={(e) =>
								setData((prevData: any) => ({
									...prevData,
									title: e.target.value,
								}))
							}
						/>
						<TextField
							label="Description"
							variant="outlined"
							fullWidth
							margin="normal"
							multiline
							rows={4}
							value={data.description || ""}
							onChange={(e) =>
								setData((prevData: any) => ({
									...prevData,
									description: e.target.value,
								}))
							}
						/>
						<FormGroup row>
							<TextField
								label="Start Date"
								type="date"
								variant="outlined"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								value={data.event_start || ""}
								onChange={(e) =>
									setData((prevData: any) => ({
										...prevData,
										event_start: e.target.value,
									}))
								}
							/>
							<TextField
								label="End Date"
								type="date"
								variant="outlined"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								value={data.event_end || ""}
								onChange={(e) =>
									setData((prevData: any) => ({
										...prevData,
										event_end: e.target.value,
									}))
								}
							/>
						</FormGroup>
					</Box>
				</CustomTabPanel>
				<CustomTabPanel value={tabIndex} index={1}>
					<Prices
						items={data.prices}
						onAddItem={handlePriceAdded}
						onRemoveItem={handlePriceRemoved}
						onChangeItem={handlePriceChanged}
					/>
				</CustomTabPanel>
				<CustomTabPanel value={tabIndex} index={2}>
					<div>
						<TextField
							label="Participant Max"
							variant="outlined"
							fullWidth
							margin="normal"
							type="number"
						/>
					</div>
					<ParticipantFields
						items={data.participant_fields}
						onAddItem={handleParticipantFieldAdded}
						onRemoveItem={handleParticipantFieldRemoved}
						onChangeItem={handleParticipantFieldChanged}
					/>
				</CustomTabPanel>
			</Paper>
		</div>
	);
}
