"use client";
import { useRouter } from "next/navigation";
export default function ClearFilterButton() {
	const router = useRouter();
	const handleClearFilter = () => {
		router.push(window.location.pathname);
	};

	return (
		<div>
			<button
				className="px-4 py-3 text-md text-white button-transition rounded-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis"
				onClick={handleClearFilter}
			>
				Clear Filter
			</button>
		</div>
	);
}
