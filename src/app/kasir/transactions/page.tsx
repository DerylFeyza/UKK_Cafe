import { getAllMenu, findAllMenu } from "@/app/utils/database/menu.query";
import { getAllMeja } from "@/app/utils/database/meja.query";
import TransactionPage from "./TransactionPage";
import { Menu, Jenis } from "@prisma/client";
export default async function Transactions({
	searchParams,
}: {
	searchParams: { keyword: string; jenis: string };
}) {
	let menus: Menu[];
	if (searchParams.keyword || searchParams.jenis) {
		menus = await findAllMenu({
			nama_menu: searchParams.keyword,
			deskripsi: searchParams.keyword,
			jenis: searchParams.jenis as Jenis,
		});
	} else {
		menus = await getAllMenu();
	}
	const mejas = await getAllMeja();
	return (
		<TransactionPage menus={menus} mejas={mejas} searchParams={searchParams} />
	);
}
