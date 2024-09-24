"use client";
export default function Sidebar({
	activeButton,
	setActiveButton,
}: {
	activeButton: "completed" | "uncomplete";
	setActiveButton: React.Dispatch<
		React.SetStateAction<"completed" | "uncomplete">
	>;
}) {
	return (
		<div className="min-h-[70vh] flex items-center bg-tertiary rounded-full p-4 flex-col justify-center shadow-lg">
			<div className="space-y-4 w-full max-w-[200px]">
				<button
					className={`w-full py-3 px-4 rounded-full text-sm font-medium transition-colors ${
						activeButton === "uncomplete"
							? "bg-secondary text-white"
							: "bg-background text-foreground hover:bg-secondary/10"
					}`}
					onClick={() => setActiveButton("uncomplete")}
				>
					Uncomplete Transactions
				</button>
				<button
					className={`w-full py-3 px-4 rounded-full text-sm font-medium transition-colors ${
						activeButton === "completed"
							? "bg-secondary text-white "
							: "bg-background text-foreground hover:bg-secondary/10"
					}`}
					onClick={() => setActiveButton("completed")}
				>
					Completed Transactions
				</button>
			</div>
		</div>
	);
}
