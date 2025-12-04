import { useEffect, useMemo, useState, useContext } from "react";
import Counter from "../ui/Counter";
import { EventContext } from "../../contexts/event";

export default function PricesPage() {
	const eventContext = useContext(EventContext);

	const [tickets, setTickets] = useState<
		{
			name: string;
			count: number;
		}[]
	>([]);

	const [remainingPlaces, setRemainingPlaces] = useState(0);

	const totalAmount = useMemo(() => {
		return tickets.reduce((total, ticket, index) => {
			return total + ticket.count * eventContext.event.prices[index].amount;
		}, 0);
	}, [tickets, eventContext.event]);

	useEffect(() => {
		if (!eventContext.event) return;
		setTickets(
			eventContext.event.prices.map((price: any) => {
				const count =
					tickets.find((ticket) => ticket.name === price.name)?.count || 0;
				return {
					name: price.name,
					count: count,
				};
			}),
		);
	}, [eventContext]);

	const handleTicketCountChange = (index: number, newCount: number) => {
		setTickets((prevTickets) => {
			const updatedTickets = [...prevTickets];
			updatedTickets[index] = {
				...updatedTickets[index],
				count: newCount,
			};
			return updatedTickets;
		});
	};

	return (
		<div>
			<div>Remaining places : {remainingPlaces}</div>
			<div>Choose Your Tickets:</div>
			<div>
				{tickets.length === 0 ? (
					<p>No tickets available.</p>
				) : (
					<div className="ticket-list">
						{tickets.map((price: any, index: number) => (
							<div className="ticket-item" key={index}>
								<div>
									<div>{price.name}</div>
									<div>${price.amount}</div>
								</div>
								<Counter
									value={
										tickets.find((ticket) => ticket.name === price.name)
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
