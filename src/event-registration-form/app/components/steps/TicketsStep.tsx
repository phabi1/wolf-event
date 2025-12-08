import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext, DataContextType } from "../../contexts/data";
import { EventContext, EventContextType } from "../../contexts/event";
import { Ticket } from "../../models/ticket.model";
import Counter from "../ui/Counter";

export default function TicketsStep() {
	const eventContext = useContext<EventContextType | null>(EventContext);
	const dataContext = useContext<DataContextType>(DataContext);

	const [remainingPlaces, setRemainingPlaces] = useState(0);

	const totalAmount = useMemo(() => {
		if (!eventContext) return 0;
		return dataContext.data.tickets.reduce((total, ticket, index) => {
			return total + ticket.count * eventContext?.prices[index].amount || 0;
		}, 0);
	}, [dataContext, eventContext]);

	const handleTicketCountChange = (index: number, newCount: number) => {
		dataContext.setData({
			...dataContext.data,
			tickets: dataContext.data.tickets.map((ticket, i) =>
				i === index ? { ...ticket, count: newCount } : ticket,
			),
		});
	};

	return (
		<div>
			<div>Remaining places : {remainingPlaces}</div>
			<div>Choose Your Tickets:</div>
			<div>
				{dataContext.data.tickets.length === 0 ? (
					<p>No tickets available.</p>
				) : (
					<div className="ticket-list">
						{dataContext.data.tickets.map((price: any, index: number) => (
							<div className="ticket-item" key={index}>
								<div>
									<div>{price.name}</div>
									<div>${price.amount}</div>
								</div>
								<Counter
									value={
										dataContext.data.tickets.find((ticket) => ticket.name === price.name)
											?.count || 0
									}
									valueChange={(newValue) =>
										handleTicketCountChange(index, newValue)
									}
								></Counter>
							</div>
						))}
					</div>
				)}
			</div>
			<div>Total Amount: ${totalAmount}</div>
		</div>
	);
}
