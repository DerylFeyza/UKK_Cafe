"use client";
import { TransaksiType } from "../../../../types/transaksi";
import { handleCompleteTransaksi } from "@/app/utils/actions/transaksi";
import TransactionDetailModal from "./TransaksiDetailModal";
import { useState } from "react";
export default function TransaksiCard({
	transaksiData,
	type,
	role,
}: {
	transaksiData: TransaksiType;
	type: "completed" | "uncomplete";
	role: "admin" | "kasir" | "manajer";
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<div className="w-60 rounded-lg overflow-hidden shadow-lg bg-white">
			<div className="px-6 py-4">
				<div className="font-semibold text-sm mb-2 ">Transaksi</div>
				<div className="font-thin text-xs mb-2 ">
					#{transaksiData.id_transaksi}
				</div>
				<p className="text-gray-700 text-base line-clamp-1 mb-1">
					{transaksiData.nama_pelanggan}
				</p>
				<div className="font-semibold text-sm mb-2 flex justify-between">
					<span>
						{transaksiData.tgl_transaksi.toLocaleDateString("id-ID", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
						})}
					</span>
					<span>
						{transaksiData.tgl_transaksi.toLocaleTimeString("id-ID", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</div>

				<div className="font-semibold text-sm mb-2 flex justify-between">
					<span> Meja:</span>
					<span> {transaksiData.Meja.nomor_meja}</span>
				</div>
				<div className="font-semibold text-sm mb-2 flex justify-between">
					<span> Kasir:</span>
					<span> {transaksiData.User.nama_user}</span>
				</div>
				<div className="font-semibold text-sm flex justify-between">
					<span> Total:</span>
					<span>Rp. {transaksiData.total.toLocaleString("id-ID")}</span>
				</div>
			</div>
			<div className="px-6 pb-6 flex justify-between items-center">
				{type === "uncomplete" ? (
					<div className="flex justify-between w-full">
						{role === "kasir" && (
							<button
								className="py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium button-transition"
								onClick={() =>
									handleCompleteTransaksi(transaksiData.id_transaksi)
								}
							>
								Sudah Bayar
							</button>
						)}
						<button
							className="py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium button-transition"
							onClick={() => setIsModalOpen(true)}
						>
							Details
						</button>
					</div>
				) : type === "completed" ? (
					<div className="flex justify-center w-full space-x-4">
						<button
							className="w-full py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium button-transition"
							onClick={() => setIsModalOpen(true)}
						>
							Details
						</button>
					</div>
				) : null}
			</div>
			<TransactionDetailModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				transaksiData={transaksiData}
			/>
		</div>
	);
}
