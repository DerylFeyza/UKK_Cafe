"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Menu } from "@prisma/client";

export default function MenuCard({ menuData }: { menuData: Menu }) {
	const [quantity, setQuantity] = useState(0);

	const formatCash = new Intl.NumberFormat("id-ID", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(menuData.harga);

	const incrementQuantity = () => setQuantity((prev) => prev + 1);
	const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));

	const handleCartClick = () => {
		setQuantity(1);
	};

	return (
		<div className="w-72 rounded-lg overflow-hidden shadow-lg bg-white">
			<div className="relative">
				<Image
					src={`/menu/${menuData.gambar}`}
					alt={menuData.nama_menu}
					width={400}
					height={400}
					className="w-full h-56 object-cover"
				/>
				<div className="absolute top-2 left-2 bg-secondary text-tertiary rounded-full px-2 py-1 text-sm font-bold">
					{menuData.jenis.charAt(0).toUpperCase() + menuData.jenis.slice(1)}
				</div>
			</div>
			<div className="px-6 py-4">
				<div
					className="font-bold text-xl mb-2 truncate"
					title="Coffee Ice Cream with Extra Toppings"
				>
					{menuData.nama_menu}
				</div>
				<p
					className="text-gray-700 text-base line-clamp-2 min-h-[3rem]"
					title="Delicious coffee flavored ice cream with a variety of toppings including chocolate chips, caramel swirl, and whipped cream"
				>
					{menuData.deskripsi}
				</p>
			</div>
			<div className="px-6 pt-4 pb-2 flex justify-between items-center">
				<span className="font-bold text-xl">Rp. {formatCash}</span>
				<div className="h-10 flex items-center">
					{quantity > 0 ? (
						<div className="flex items-center bg-orange-500 rounded-full overflow-hidden">
							<button
								onClick={decrementQuantity}
								className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
								aria-label="Decrease quantity"
							>
								<Minus size={20} />
							</button>
							<span
								className="font-bold text-white w-8 text-center"
								aria-live="polite"
								aria-atomic="true"
							>
								{quantity}
							</span>
							<button
								onClick={incrementQuantity}
								className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
								aria-label="Increase quantity"
							>
								<Plus size={20} />
							</button>
						</div>
					) : (
						<button
							onClick={handleCartClick}
							className="bg-orange-500 rounded-full px-4 py-2 text-white hover:bg-orange-600 transition-colors flex items-center space-x-2"
							aria-label="Add to cart"
						>
							<ShoppingCart size={20} />
							<span className="font-semibold">Add</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
