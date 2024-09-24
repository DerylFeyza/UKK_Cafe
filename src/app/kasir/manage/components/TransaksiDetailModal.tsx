"use client";
import { TransaksiType } from "../../../../../types/transaksi";
import Logo from "@/../public/logo/logo.png";
import Image from "next/image";
import { X } from "lucide-react";
//@ts-expect-error no types
import html2pdf from "html2pdf.js";

export default function TransaksiDetailModal({
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

	const generatePDF = () => {
		const element = document.getElementById("pdf-content");
		if (element) {
			const offScreenContainer = document.createElement("div");
			offScreenContainer.style.position = "absolute";
			offScreenContainer.style.left = "-9999px";
			offScreenContainer.style.top = "-9999px";
			document.body.appendChild(offScreenContainer);

			const clonedElement = element.cloneNode(true) as HTMLElement;
			clonedElement.style.width = "190mm";
			clonedElement.style.height = "auto";
			clonedElement.style.maxHeight = "none";
			clonedElement.style.overflow = "visible";
			offScreenContainer.appendChild(clonedElement);

			html2pdf()
				.set({
					margin: 10,
					filename: `Invoice_${transaksiData.id_transaksi}.pdf`,
					html2canvas: { scale: 2 },
					jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
				})
				.from(clonedElement)
				.save()
				.then(() => {
					document.body.removeChild(offScreenContainer);
				})
				.catch((error: Error) => {
					console.error("Error generating PDF:", error);
					document.body.removeChild(offScreenContainer);
				});
		}
	};

	return (
		<div>
			{isModalOpen && (
				<div
					className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4 "
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

						<div
							className="p-6 max-h-[60vh] overflow-y-auto pr-2 pb-6"
							id="pdf-content"
						>
							<div className="space-y-3">
								<div className="flex items-center">
									<Image
										src={Logo}
										alt="Logo"
										className="lg:w-[80px] w-[60px] mr-2"
									/>
									<div className="flex flex-wrap">
										<div className="text-lg font-semibold w-full">
											<span className="text-primary text-4xl unselectable">
												Coffee
											</span>
											<span className="text-secondary text-4xl unselectable">
												Sek
											</span>
										</div>
										<div className="font-thin text-md mb-2 ">
											#{transaksiData.id_transaksi}
										</div>
									</div>
								</div>
								<div className="pt-4">
									<span className="text-primary text-4xl font-semibold">
										Invoice
									</span>
								</div>
								<div className="font-semibold text-2xl mb-2 flex space-x-6  tems-center">
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
								<div className="font-semibold text-xl flex space-x-6 pt-6">
									<span>Billing Information</span>
								</div>

								<div className="w-6/12 space-y-3">
									<div className="font-medium text-lg flex">
										<span className="w-1/3">Pelanggan:</span>
										<span className="flex-grow">
											{transaksiData.nama_pelanggan}
										</span>
									</div>
									<div className="font-medium text-lg flex">
										<span className="w-1/3">Kasir:</span>
										<span className="flex-grow ">
											{transaksiData.User.nama_user}
										</span>
									</div>
									<div className="font-medium text-lg flex pb-2">
										<span className="w-1/3">Meja:</span>
										<span className="flex-grow">
											{transaksiData.Meja.nomor_meja}
										</span>
									</div>
								</div>
							</div>
							<div className="font-semibold text-xl flex space-x-6 pt-6">
								<span> Order Details</span>
							</div>
							<div className="grid grid-cols-[2fr_1fr_1fr_1fr] font-bold text-left border-b py-2">
								<span>Name</span>
								<span>Quantity</span>
								<span>Harga</span>
								<span>Total </span>
							</div>
							<div className="pr-2 pb-6">
								{transaksiData.DetailTransaksi.map((item, index) => (
									<div
										key={index}
										className="grid grid-cols-[2fr_1fr_1fr_1fr] text-left py-2"
									>
										<span className="line-clamp-2 min-h-[2rem]">
											{item.Menu.nama_menu}
										</span>
										<span className="pl-8">{item.jumlah}x</span>
										<span>Rp. {item.Menu.harga.toLocaleString("id-ID")}</span>
										<span>
											Rp. {(item.jumlah * item.harga).toLocaleString("id-ID")}
										</span>
									</div>
								))}
							</div>
							<div className="font-semibold text-xl flex justify-between py-2">
								<span>Total:</span>
								<span className="px-8">
									Rp. {transaksiData.total.toLocaleString("id-ID")}
								</span>
							</div>
						</div>
						<div className="p-4 flex ">
							<button
								type="button"
								className=" button-transition font-bold py-2 px-4 rounded-lg"
								onClick={generatePDF}
							>
								Cetak Nota
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
