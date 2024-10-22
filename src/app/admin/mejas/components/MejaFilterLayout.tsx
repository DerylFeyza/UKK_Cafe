"use client";
import { useState } from "react";
import SearchInput from "@/app/components/general/SearchInput";
import { useRouter } from "next/navigation";

export default function MejaFilterLayout({
	searchData,
}: {
	searchData: { keyword?: string; showDeleted?: string };
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [showDeleted, setShowDeleted] = useState<boolean>(
		searchData.showDeleted ? true : false
	);
	const router = useRouter();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleDeletedFilter = () => {
		const newShowDeleted = !showDeleted;
		setShowDeleted(newShowDeleted);
		const params: URLSearchParams = new URLSearchParams();

		if (newShowDeleted) {
			params.set("showDeleted", JSON.stringify(newShowDeleted));
		}
		if (searchTerm) {
			params.set("keyword", searchTerm);
		}

		router.push(`?${params.toString()}`);
	};

	const handleSearch = () => {
		const params: URLSearchParams = new URLSearchParams();
		if (searchTerm) {
			params.set("keyword", searchTerm);
		}
		if (showDeleted) {
			params.set("showDeleted", JSON.stringify(showDeleted));
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex w-full flex-wrap gap-2 my-4">
			<SearchInput
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
				handleSearch={handleSearch}
			/>
			<div className="flex-grow flex space-x-2">
				<button
					onClick={handleDeletedFilter}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						showDeleted === true
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Show Deleted
				</button>
			</div>
		</div>
	);
}
