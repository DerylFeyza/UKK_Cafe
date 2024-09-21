"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FilterLayout({
	searchData,
}: {
	searchData: { keyword?: string; role?: string };
}) {
	const [searchTerm, setSearchTerm] = useState<string | "">(
		searchData.keyword || ""
	);
	const [activeRole, setActiveRole] = useState<string | null>(
		searchData.role || null
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
			params.set("keyword", searchTerm.toLowerCase());
		}

		if (newRole) {
			params.set("role", newRole);
		}

		router.push(`?${params.toString()}`);
	};

	const handleSearch = () => {
		const params: URLSearchParams = new URLSearchParams();
		if (searchTerm) {
			params.set("keyword", searchTerm.toLowerCase());
		}
		if (activeRole) {
			params.set("role", activeRole);
		}
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex w-full flex-wrap gap-2 mb-4">
			<div className="relative w-96">
				<input
					type="text"
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder="Search..."
					className="block w-full px-4 py-2 pl-10 rounded-md border-2 border-tertiary shadow-sm"
				/>
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<Search className="text-secondary h-5 w-5" />
				</div>
				<button
					onClick={handleSearch}
					className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 rounded-md border-2 border-tertiary bg-primary text-white transition duration-300"
				>
					Search
				</button>
			</div>
			<div className="w-80 flex space-x-2">
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
			</div>
		</div>
	);
}
