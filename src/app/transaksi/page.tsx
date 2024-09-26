import {
	getAllCompletedTransaksi,
	getAllUncompleteTransaksi,
	findCompletedTransaksi,
	findUncompleteTransaksi,
} from "@/app/utils/database/transaksi.query";
import TransaksiManagepage from "./TransaksiManagePage";
import { TransaksiType } from "../../../types/transaksi";
import { Suspense } from "react";

export default async function ManageTransaction({
	searchParams,
}: {
	searchParams: { start: string; end: string };
}) {
	let completedTransaksi: TransaksiType[];
	let uncompleteTransaksi: TransaksiType[];

	if (searchParams.start && searchParams.end) {
		completedTransaksi = await findCompletedTransaksi(
			searchParams.start,
			searchParams.end
		);
		uncompleteTransaksi = await findUncompleteTransaksi(
			searchParams.start,
			searchParams.end
		);
	} else {
		completedTransaksi = await getAllCompletedTransaksi();
		uncompleteTransaksi = await getAllUncompleteTransaksi();
	}
	return (
		<Suspense fallback={<div className="min-h-screen bg-background" />}>
			<TransaksiManagepage
				uncompleteTransaksi={uncompleteTransaksi}
				completedTransaksi={completedTransaksi}
			/>
		</Suspense>
	);
}
