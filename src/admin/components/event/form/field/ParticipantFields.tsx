import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Collection from "../../../ui/Collection";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function renderParticipantField(item: any, index: number) {
	return (
		<div>
			<strong>{item.label}</strong> ({item.type}){" "}
			{item.required ? "*required*" : ""}
		</div>
	);
}

export default function ParticipantFields({
	items,
	onAddItem,
	onRemoveItem,
	onChangeItem,
}: {
	items: any[];
	onAddItem: (item: any) => void;
	onRemoveItem: (index: number) => void;
	onChangeItem: (index: number, item: any) => void;
}) {
	const types = [
		{ name: "text", title: "Text" },
		{ name: "number", title: "Number" },
		{ name: "email", title: "Email" },
		{ name: "date", title: "Date" },
		{ name: "checkbox", title: "Checkbox" },
		{ name: "select", title: "Select" },
		{ name: "file", title: "File" },
	];

	const [open, setOpen] = useState(false);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [data, setData] = useState<any>({});

	const handleAddItem = () => {
		setOpen(true);
	};

	return (
		<>
			<Collection
				items={items}
				template={renderParticipantField}
				onAddItem={handleAddItem}
				onRemoveItem={onRemoveItem}
			/>
			<Dialog open={open} onClose={() => setOpen(false)}>
				{selectedType ? (
					<>
						<DialogTitle>Add Participant Field - {selectedType}</DialogTitle>
						<DialogContent>
							<Box>
								<TextField
									label="Field Label"
									variant="outlined"
									margin="normal"
									value={data.label}
									onChange={(e) => setData({ ...data, label: e.target.value })}
								/>
								<TextField
									label="Field Name"
									variant="outlined"
									margin="normal"
									value={data.name}
									onChange={(e) => setData({ ...data, name: e.target.value })}
								/>
								<Switch
									checked={data.required}
									onChange={(e) =>
										setData({ ...data, required: e.target.checked })
									}
								/>{" "}
								Required
							</Box>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									onAddItem({ type: selectedType, ...data });
									setOpen(false);
									setSelectedType(null);
								}}
							>
								Confirm
							</Button>
							<Button
								onClick={() => {
									setSelectedType(null);
								}}
							>
								Back
							</Button>
						</DialogActions>
					</>
				) : (
					<>
						<DialogTitle>Select Field Type</DialogTitle>
						<DialogContent>
							<Grid container spacing={2}>
								{types.map((type) => (
									<Grid key={type.name} size={6}>
										<Button onClick={() => setSelectedType(type.name)}>
											{type.title}
										</Button>
									</Grid>
								))}
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setOpen(false)}>Cancel</Button>
						</DialogActions>
					</>
				)}
			</Dialog>
		</>
	);
}
