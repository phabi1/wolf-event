export interface CounterProps {
	value: number;
	valueChange?: (newValue: number) => void;
}

export default function Counter({ value, valueChange }: CounterProps) {
	const handleIncrement = () => {
		valueChange && valueChange(value + 1);
	};

	const handleDecrement = () => {
		valueChange && valueChange(value - 1);
	};

	return (
		<div className="counter-input">
			<button className="counter-input-button" onClick={handleDecrement}>
				-
			</button>
			<span className="counter-input-value">{value}</span>
			<button className="counter-input-button" onClick={handleIncrement}>
				+
			</button>
		</div>
	);
}
