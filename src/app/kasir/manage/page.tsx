import {
	getAllCompletedTransaksi,
	getAllUncompleteTransaksi,
	findCompletedTransaksi,
	findUncompleteTransaksi,
} from "@/app/utils/database/transaksi.query";
import KasirManagePage from "./ManagePage";
import { TransaksiType } from "../../../../types/transaksi";
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
		<KasirManagePage
			uncompleteTransaksi={uncompleteTransaksi}
			completedTransaksi={completedTransaksi}
		/>
	);
}
