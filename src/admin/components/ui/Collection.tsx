import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

export default function Collection({
	items,
	emptyLabel,
	addLabel,
	removeLabel,
	template,
	onAddItem,
	onRemoveItem,
	onClickItem,
	onMove,
}: {
	items: any[];
	emptyLabel?: string;
	addLabel?: string;
	removeLabel?: string;
	template: (item: any, index: number) => React.ReactNode;
	onAddItem: () => void;
	onRemoveItem: (index: number) => void;
	onClickItem?: (index: number) => void;
	onMove?: (items: any[]) => void;
}) {
	return (
		<div>
			<Button onClick={onAddItem}>{addLabel || "Add Item"}</Button>
			{items.length > 0 ? (
				<List>
					{items.map((item, index) => (
						<ListItem
							key={index}
							className="flex items-center mb-2"
							secondaryAction={
								<Tooltip title={removeLabel || "Remove Item"}>
									<IconButton onClick={() => onRemoveItem(index)}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							}
							onClick={() => onClickItem && onClickItem(index)}
						>
							<div>{template(item, index)}</div>
						</ListItem>
					))}
				</List>
			) : emptyLabel ? (
				<div>{emptyLabel}</div>
			) : (
				<div>No items added yet.</div>
			)}
		</div>
	);
}
