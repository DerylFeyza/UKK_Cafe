"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "@/app/components/general/SearchInput";
export default function FilterLayout({
	searchData,
}: {
	searchData: { keyword?: string; role?: string; showDeleted?: string };
}) {
	const [searchTerm, setSearchTerm] = useState<string | "">(
		searchData.keyword || ""
	);
	const [activeRole, setActiveRole] = useState<string | null>(
		searchData.role || null
	);
	const [showDeleted, setShowDeleted] = useState<boolean>(
		searchData.showDeleted ? true : false
	);
	const router = useRouter();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleRoleFilter = (role: string) => {
		const newRole = role === activeRole ? null : role;
		setActiveRole(newRole);
		const params: URLSearchParams = new URLSearchParams();

		if (searchTerm) {
			params.set("keyword", searchTerm);
		}
		if (newRole) {
			params.set("role", newRole);
		}
		if (showDeleted) {
			params.set("showDeleted", JSON.stringify(showDeleted));
		}

		router.push(`?${params.toString()}`);
	};

	const handleDeletedFilter = () => {
		const newShowDeleted = !showDeleted;
		setShowDeleted(newShowDeleted);
		const params: URLSearchParams = new URLSearchParams();

		if (searchTerm) {
			params.set("keyword", searchTerm);
		}
		if (activeRole) {
			params.set("role", activeRole);
		}
		if (newShowDeleted) {
			params.set("showDeleted", JSON.stringify(newShowDeleted));
		}

		router.push(`?${params.toString()}`);
	};
	const handleSearch = () => {
		const params: URLSearchParams = new URLSearchParams();
		if (searchTerm) {
			params.set("keyword", searchTerm);
		}
		if (activeRole) {
			params.set("role", activeRole);
		}
		if (showDeleted) {
			params.set("showDeleted", JSON.stringify(showDeleted));
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex w-full flex-wrap gap-2 mb-4 ">
			<SearchInput
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
				handleSearch={handleSearch}
			/>
			<div className="flex-grow flex space-x-2">
				<button
					onClick={() => handleRoleFilter("admin")}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						activeRole === "admin"
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Admin
				</button>
				<button
					onClick={() => handleRoleFilter("manajer")}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						activeRole === "manajer"
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Manajer
				</button>
				<button
					onClick={() => handleRoleFilter("kasir")}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						activeRole === "kasir"
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Kasir
				</button>
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
