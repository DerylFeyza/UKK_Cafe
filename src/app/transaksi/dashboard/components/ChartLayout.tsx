"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ChartLayout({ mode }: { mode?: string }) {
	const [activeMode, setActiveMode] = useState<string>(mode ?? "transaksi");
	const router = useRouter();

	const handlemodeFilter = (mode: string) => {
		setActiveMode(mode);
		const params: URLSearchParams = new URLSearchParams();
		params.set("mode", mode);

		router.push(`?${params.toString()}`);
	};

	useEffect(() => {
		if (!mode) {
			router.push(`?mode=transaksi`);
		}
	}, [mode, router]);

	return (
		<div className="w-80 flex">
			<div className="w-1/2">
				<button
					onClick={() => handlemodeFilter("transaksi")}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						activeMode === "transaksi"
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Transaksi
				</button>
			</div>
			<div className="w-1/2">
				<button
					onClick={() => handlemodeFilter("pendapatan")}
					className={`px-4 py-2 rounded-md border-2 shadow-sm transition duration-300 ${
						activeMode === "pendapatan"
							? "bg-primary text-white border-primary"
							: "bg-tertiary text-secondary border-tertiary"
					}`}
				>
					Pendapatan
				</button>
			</div>
		</div>
	);
}
