import { useContext } from "react";
import { DataContext, DataContextType } from "../../contexts/data";

export default function ContactPage() {
	const dataContext = useContext<DataContextType>(DataContext);

	const setInformation = (field: string, value: string) => {
		dataContext.setData({
			...dataContext.data,
			contactInfo: {
				...dataContext.data.contactInfo,
				[field]: value,
			},
		});
	};

	return (
		<div>
			<div>
				<label>First Name</label>
				<input
					type="text"
					value={dataContext.data.contactInfo?.firstname || ""}
					onChange={(e) => setInformation("firstname", e.target.value)}
				/>
			</div>
			<div>
				<label>Last Name</label>
				<input
					type="text"
					value={dataContext.data.contactInfo?.lastname || ""}
					onChange={(e) => setInformation("lastname", e.target.value)}
				/>
			</div>
			<div>
				<label>Email</label>
				<input
					type="email"
					value={dataContext.data.contactInfo?.email || ""}
					onChange={(e) => setInformation("email", e.target.value)}
				/>
			</div>
		</div>
	);
}
