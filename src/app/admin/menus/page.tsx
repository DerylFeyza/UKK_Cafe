import MenuCard from "@/app/components/general/MenuCard";
import AddMenuForm from "./components/AddMenuForm";
import { getAllMenu } from "@/app/utils/database/menu.query";
export default async function Menus() {
	const menus = await getAllMenu();
	return (
		<div className="min-h-screen bg-background p-8 pt-24">
			<div className="max-w-8xl mx-auto flex">
				<div className="w-[70%] ">
					<div className="flex flex-wrap max-h-[82vh] overflow-y-auto mr-24 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24">
						{menus &&
							menus.map((menu, index) => (
								<div className="pb-4 pl-2 pr-2" key={index}>
									<MenuCard menuData={menu} />
								</div>
							))}
					</div>
				</div>

				<div className="w-[30%] max-h-[82vh] overflow-y-auto">
					<AddMenuForm />
				</div>
			</div>
		</div>
	);
}
