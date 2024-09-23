"use client";
import TransactionForm from "./components/TransactionForm";
import MenuCard from "@/app/components/general/MenuCard";
import { Menu, Meja } from "@prisma/client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { addItemsToMejaList } from "@/redux/slices/mejaSlice";
export default function TransactionPage({
	menus,
	mejas,
}: {
	menus: Menu[];
	mejas: Meja[];
}) {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(addItemsToMejaList(mejas));
	}, [dispatch, mejas]);

	return (
		<div className="min-h-screen bg-background p-8 pt-24">
			<div className="max-w-8xl mx-auto flex">
				<div className="w-[70%] ">
					<div className="flex flex-wrap max-h-[82vh] overflow-y-auto mr-24 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24">
						{menus &&
							menus.map((menu, index) => (
								<div className="pb-4 pl-2 pr-2" key={index}>
									<MenuCard menuData={menu} path={"kasir"} />
								</div>
							))}
					</div>
				</div>

				<div className="w-[30%] max-h-[82vh] overflow-y-auto pr-5">
					<TransactionForm />
				</div>
			</div>
		</div>
	);
}
