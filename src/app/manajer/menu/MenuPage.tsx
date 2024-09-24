"use client";
import { Menu } from "@prisma/client";
import MenuCard from "@/app/components/general/MenuCard";
export default function MenuPage({ menuData }: { menuData: Menu[] }) {
	return (
		<>
			{menuData.map((menu: Menu) => (
				<MenuCard key={menu.id_menu} menuData={menu} path="manajer" />
			))}
		</>
	);
}
