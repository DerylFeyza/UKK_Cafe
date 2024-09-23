import {
	getAllCompletedTransaksi,
	getAllUncompleteTransaksi,
} from "@/app/utils/database/transaksi.query";
import KasirManagePage from "./ManagePage";
export default async function ManageTransaction() {
	const completedTransaksi = await getAllCompletedTransaksi();
	const uncompleteTransaksi = await getAllUncompleteTransaksi();
	return (
		<KasirManagePage
			uncompleteTransaksi={uncompleteTransaksi}
			completedTransaksi={completedTransaksi}
		/>
	);
}
