"use client";
import { X } from "lucide-react";
import { TransaksiType } from "../../../../../types/transaksi";

export default function TransactionDetailModal({
	isModalOpen,
	setIsModalOpen,
	transaksiData,
}: {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	transaksiData: TransaksiType;
}) {
	const toggleModal = () => {
		setIsModalOpen(false);
	};

	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			setIsModalOpen(false);
		}
	};

	return (
		<div>
			{isModalOpen && (
				<div
					className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4"
					onClick={handleOverlayClick}
				>
					<div
						className="bg-white rounded-lg shadow-3xl max-w-4xl w-full relative overflow-hidden transform transition-all duration-300 ease-in-out"
						style={{
							animation: "modalAppear 0.3s ease-out",
						}}
					>
						<button
							onClick={toggleModal}
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
						>
							<X className="w-6 h-6" />
						</button>

						<div className="p-6">
							<div className="space-y-3">
								<div className="font-semibold text-2xl mb-2 flex space-x-6">
									<span> Transaksi</span>
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
								<div className="font-thin text-md mb-2 ">
									#{transaksiData.id_transaksi}
								</div>
								<div className="font-semibold text-lg flex space-x-6">
									<span> Pelanggan:</span>
									<span> {transaksiData.nama_pelanggan}</span>
								</div>
								<div className="font-semibold text-lg flex space-x-6">
									<span> Kasir:</span>
									<span> {transaksiData.User.nama_user}</span>
								</div>
								<div className="font-semibold text-lg flex space-x-6">
									<span> Meja:</span>
									<span> {transaksiData.Meja.nomor_meja}</span>
								</div>
							</div>
							<div className="font-semibold text-xl flex space-x-6 pt-6 pb-">
								<span> Order Details:</span>
							</div>
							<div className="max-h-[250px] overflow-y-auto pr-2 pb-6">
								<div className="grid grid-cols-[2fr_1fr_1fr_1fr] font-bold text-left border-b py-2">
									<span>Name</span>
									<span>Quantity</span>
									<span>Harga</span>
									<span>Total </span>
								</div>

								{transaksiData.DetailTransaksi.map((item, index) => (
									<div
										key={index}
										className="grid grid-cols-[2fr_1fr_1fr_1fr] text-left py-2"
									>
										<span className="line-clamp-1">{item.Menu.nama_menu}</span>
										<span className="pl-8">{item.jumlah}x</span>{" "}
										<span>Rp. {item.Menu.harga.toLocaleString("id-ID")}</span>
										<span>
											Rp. {(item.jumlah * item.harga).toLocaleString("id-ID")}
										</span>
									</div>
								))}
							</div>
							<div className="font-semibold text-xl flex justify-between">
								<span>Total:</span>
								<span>Rp. {transaksiData.total.toLocaleString("id-ID")}</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
