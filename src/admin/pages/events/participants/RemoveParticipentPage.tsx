import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router";
import { eventService } from "../../../services/event";

export default function RemoveParticipantPage() {
	const params = useParams();
	const navigate = useNavigate();

	const handleConfirm = async () => {
		await eventService.deleteParticipantById(
			params.eventId!,
			params.participantId!,
		);
		handleClose();
	};

	const handleClose = () => {
		navigate(-1);
	};

	return (
		<Dialog open={true} onClose={() => {}}>
			<DialogTitle>Remove Participant</DialogTitle>
			<DialogContent>
				Are you sure you want to remove this participant?
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="primary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="outlined" color="error" onClick={handleConfirm}>
					Remove
				</Button>
			</DialogActions>
		</Dialog>
	);
}
