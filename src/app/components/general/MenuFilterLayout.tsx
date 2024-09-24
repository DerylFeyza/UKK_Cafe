"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "@/app/components/general/SearchInput";
export default function MenuFilterLayout({
	searchData,
}: {
	searchData: { keyword?: string; jenis?: string };
}) {
	const [searchTerm, setSearchTerm] = useState<string | "">(
		searchData.keyword || ""
	);
	const [activeJenis, setActiveJenis] = useState<string | null>(
		searchData.jenis || null
	);
	const router = useRouter();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleJenisFilter = (jenis: string) => {
		const newJenis = jenis === activeJenis ? null : jenis;
		setActiveJenis(newJenis);
		const params: URLSearchParams = new URLSearchParams();

		if (searchTerm) {
			params.set("keyword", searchTerm);
		}
		if (newJenis) {
			params.set("jenis", newJenis);
		}

		router.push(`?${params.toString()}`);
	};

	const handleSearch = () => {
		const params: URLSearchParams = new URLSearchParams();
		if (searchTerm) {
			params.set("keyword", searchTerm);
		}
		if (activeJenis) {
			params.set("jenis", activeJenis);
		}
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex w-full flex-wrap gap-2 mb-4">
			<SearchInput
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
				handleSearch={handleSearch}
			/>
			<div className="w-80 flex space-x-2">
				<button
					onClick={() => handleJenisFilter("makanan")}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						activeJenis === "makanan"
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Makanan
				</button>
				<button
					onClick={() => handleJenisFilter("minuman")}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						activeJenis === "minuman"
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Minuman
				</button>
			</div>
		</div>
	);
}
