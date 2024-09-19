"use client";

import Image from "next/image";
import { Menu } from "@prisma/client";
import TransactionButton from "./MenuCardButtons/TransactionButton";
import DetailsButton from "./MenuCardButtons/DetailsButton";
import DetailModal from "../../admin/menus/components/DetailModal";
import { useState } from "react";

export default function MenuCard({
	menuData,
	path,
}: {
	menuData: Menu;
	path: "admin" | "kasir";
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const formatCash = new Intl.NumberFormat("id-ID", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(menuData.harga);

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
				<div className="font-bold text-xl mb-2 truncate">
					{menuData.nama_menu}
				</div>
				<p className="text-gray-700 text-base line-clamp-2 min-h-[3rem]">
					{menuData.deskripsi}
				</p>
			</div>
			<div className="px-6 pb-6 flex justify-between items-center">
				<span className="font-bold text-xl">Rp. {formatCash}</span>
				{path === "admin" ? (
					<DetailsButton setIsModalOpen={setIsModalOpen} />
				) : path === "kasir" ? (
					<TransactionButton />
				) : null}
			</div>
			<DetailModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				initialData={menuData}
			/>
		</div>
	);
}
