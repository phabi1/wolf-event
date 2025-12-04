import TextField from "@mui/material/TextField";
import Collection from "../../../ui/Collection";

function renderPriceItem(item: any, index: number) {
    return (
        <div>
            <TextField
                label="Price Name"
                variant="outlined"
                margin="normal"
                value={item.name}
                sx={{ mr: 2 }}
            />
            <TextField
                label="Amount"
                variant="outlined"
                margin="normal"
                type="number"
                value={item.amount}
            />
        </div>
    );
}

export default function Prices({
	items,
	onAddItem,
	onRemoveItem,
	onChangeItem,
}: {
	items: any[];
	onAddItem: () => void;
	onRemoveItem: (index: number) => void;
	onChangeItem: (index: number, item: any) => void;
}) {
	return (
		<Collection
			items={items}
			template={renderPriceItem}
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
		/>
	);
}
