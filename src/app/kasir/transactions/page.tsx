import { getAllMenu } from "@/app/utils/database/menu.query";
import { getAllMeja } from "@/app/utils/database/meja.query";
import { Suspense } from "react";
import TransactionPage from "./TransactionPage";
export default async function Transactions() {
	const menus = await getAllMenu();
	const mejas = await getAllMeja();
	return (
		<Suspense>
			<TransactionPage menus={menus} mejas={mejas} />
		</Suspense>
	);
}
