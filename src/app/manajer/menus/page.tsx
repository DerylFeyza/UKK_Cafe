import MenuCard from "@/app/components/general/MenuCard";
import { getAllMenu, findAllMenu } from "@/app/utils/database/menu.query";
import { Menu, Jenis } from "@prisma/client";
import MenuFilterLayout from "@/app/components/general/MenuFilterLayout";
export default async function Menus({
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
	return (
		<div className="max-h-screen min-h-screen bg-background p-8 pt-24">
			<div className="max-w-screen mx-auto">
				<MenuFilterLayout searchData={searchParams} />
				<div className="flex flex-wrap max-h-[76vh] overflow-y-auto sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24 gap-4">
					{menus &&
						menus.map((menu, index) => (
							<div key={index}>
								<MenuCard menuData={menu} path={"manajer"} />
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
