export interface ButtonProps {
	buttonText?: string;
	onClick?: () => void;
}

export default function Button({ buttonText, onClick }: ButtonProps) {
	return (
		<button
			className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
			onClick={onClick}
		>
			{buttonText || "Click Me"}
		</button>
	);
}
