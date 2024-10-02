"use client";
import Sidebar from "./components/Sidebar";
import TransaksiCard from "./components/TransaksiCard";
import { useState } from "react";
import { TransaksiType } from "../../../types/transaksi";
import DateRangePicker from "@/app/components/general/DateRangePicker";
import { useSession } from "next-auth/react";
export default function TransaksiManagePage({
	completedTransaksi,
	uncompleteTransaksi,
}: {
	completedTransaksi: TransaksiType[];
	uncompleteTransaksi: TransaksiType[];
}) {
	const [activeButton, setActiveButton] = useState<"uncomplete" | "completed">(
		"uncomplete"
	);

	type UserRole = "admin" | "kasir" | "manajer";
	const { data: session } = useSession();
	const userRole = session?.user?.role as UserRole;

	const displayedTransaksi =
		activeButton === "uncomplete" ? uncompleteTransaksi : completedTransaksi;

	return (
		<div className="min-h-screen bg-background p-8 pt-24 max-h-screen overflow-hidden">
			<div className="max-w-8xl mx-auto flex space-x-12">
				<div className="w-1/5">
					<Sidebar
						activeButton={activeButton}
						setActiveButton={setActiveButton}
					/>
				</div>
				<div className="w-4/5">
					<div className="pb-4">
						<DateRangePicker />
					</div>

					<div className="flex gap-4 flex-wrap max-h-[72vh] overflow-y-auto mr-24 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24">
						{displayedTransaksi.map((transaksi) => (
							<TransaksiCard
								key={transaksi.id_transaksi}
								transaksiData={transaksi}
								type={activeButton}
								role={userRole}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
