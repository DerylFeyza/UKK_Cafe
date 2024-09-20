"use client";
import { Search } from "lucide-react";
import { useState } from "react";

export default function FilterLayout() {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeRole, setActiveRole] = useState<string | null>(null);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleRoleFilter = (role: string) => {
		setActiveRole(role === activeRole ? null : role); // Toggle role filter
	};

	return (
		<div className="flex w-full flex-wrap gap-2 mb-4">
			<div className="w-96 relative">
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
			</div>
			<div className="w-80 flex space-x-2">
				{["Admin", "Manajer", "Kasir"].map((role) => (
					<button
						key={role}
						onClick={() => handleRoleFilter(role)}
						className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
							activeRole === role
								? "bg-primary text-white border-primary"
								: "bg-tertiary text-secondary border-tertiary"
						}`}
					>
						{role}
					</button>
				))}
			</div>
		</div>
	);
}
