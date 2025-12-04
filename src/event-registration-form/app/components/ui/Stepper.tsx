import { Children, isValidElement, useMemo, useState } from "react";

function Step({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}

function StepperBar({
	steps,
	currentStepIndex,
}: {
	steps: string[];
	currentStepIndex: number;
}) {
	const progression = useMemo(() => {
		return ((currentStepIndex - 1) / (steps.length - 1)) * 100;
	}, [currentStepIndex, steps.length]);

	return (
		<div className="stepper-bar">
			<div className="stepper-bar-progress">
				<div className="stepper-bar-progress-bg"></div>
				<div
					className="stepper-bar-progress-fg"
					style={{ width: `${progression}%` }}
				></div>
			</div>
			<div className="stepper-bar-items">
				{steps.map((label, index) => (
					<div
						className={`stepper-bar-item ${
							currentStepIndex === index + 1 ? "active" : ""
						}`}
						key={index}
					>
						{label}
					</div>
				))}
			</div>
		</div>
	);
}

export function Stepper({ children }: { children?: React.ReactNode }) {
	const [currentStepIndex, setCurrentStepIndex] = useState(1);

	const steps = useMemo<Array<React.ReactElement>>(() => {
		const stepsArray: Array<React.ReactElement> = [];
		Children.forEach(children, (child: any, index) => {
			if (isValidElement(child) && child.type === Step) {
				stepsArray.push(child);
			}
		});
		return stepsArray;
	}, [children]);

	const labels = useMemo(() => {
		return steps.map((s) => s.props.label);
	}, [steps]);

	const canPrevious = useMemo(() => currentStepIndex > 1, [currentStepIndex]);
	const canNext = useMemo(
		() => currentStepIndex < steps.length,
		[currentStepIndex, steps.length],
	);

	const previousStep = () => {
		setCurrentStepIndex((prev) => Math.max(prev - 1, 1));
	};

	const nextStep = () => {
		setCurrentStepIndex((prev) => Math.min(prev + 1, labels.length));
	};

	return (
		<div>
			<div>
				<StepperBar steps={labels} currentStepIndex={currentStepIndex} />
			</div>
			<div>{steps[currentStepIndex - 1]}</div>
			<div className="stepper-actions">
				<div>
					{canPrevious && (
						<button onClick={() => previousStep()}>Previous</button>
					)}
				</div>
				<div>{canNext && <button onClick={() => nextStep()}>Next</button>}</div>
			</div>
		</div>
	);
}

Stepper.Step = Step;

export default Stepper;
