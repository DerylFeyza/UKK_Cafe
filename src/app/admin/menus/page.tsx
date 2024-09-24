import MenuCard from "@/app/components/general/MenuCard";
import AddMenuForm from "./components/AddMenuForm";
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
			<div className="max-w-8xl mx-auto flex">
				<div className="w-[70%] ">
					<MenuFilterLayout searchData={searchParams} />
					<div className="flex flex-wrap max-h-[76vh] overflow-y-auto mr-24 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24">
						{menus &&
							menus.map((menu, index) => (
								<div className="pb-4 pr-2" key={index}>
									<MenuCard menuData={menu} path={"admin"} />
								</div>
							))}
					</div>
				</div>

				<div className="w-[30%] max-h-[82vh] overflow-y-auto pr-5">
					<AddMenuForm />
				</div>
			</div>
		</div>
	);
}
