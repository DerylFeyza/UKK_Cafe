"use client";
import { MejaWithTransaksiCount } from "../../../../../types/meja";
import { X } from "lucide-react";
import {
	handleHardDeleteMeja,
	handleRestoreMeja,
} from "@/app/utils/actions/meja";
import { handleToastResponse } from "@/app/components/general/ToastNotification";
export default function MejaNotifModal({
	isNotifModalOpen,
	setIsNotifModalOpen,
	mejaData,
	mode,
}: {
	isNotifModalOpen: boolean;
	setIsNotifModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mejaData: MejaWithTransaksiCount;
	mode?: "delete" | "restore" | "";
}) {
	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			setIsNotifModalOpen(!isNotifModalOpen);
		}
	};

	const handleDelete = async (id: string) => {
		const result = await handleHardDeleteMeja(id);
		handleToastResponse(result);
	};

	const handleRestore = async (id: string) => {
		const result = await handleRestoreMeja(id);
		handleToastResponse(result);
	};

	return (
		<div>
			{isNotifModalOpen && (
				<div
					className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4"
					onClick={handleOverlayClick}
				>
					<div
						className="bg-white rounded-lg shadow-xl max-w-lg w-full relative overflow-hidden transform transition-all duration-300 ease-in-out"
						style={{
							animation: "modalAppear 0.3s ease-out",
						}}
					>
						{mode == "delete" ? (
							<div className="p-4">
								<button
									onClick={() => setIsNotifModalOpen(!isNotifModalOpen)}
									className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
								>
									<X className="w-6 h-6" />
								</button>
								<div className="p-6">
									<span className="text-lg font-bold">
										Are you sure you want to hard delete this meja?
									</span>
									<div className="flex justify-center items-center w-full flex-col mt-4">
										<div className="font-bold text-xl truncate line-clamp-1 text-primary">
											Meja Nomor {mejaData.nomor_meja}
										</div>
									</div>

									<span className="text-lg text-center block mt-4">
										{mejaData._count.Transaksi} related transaksi to this meja
										will be deleted permanently
									</span>
								</div>
								<button
									className="w-full button-transition font-bold py-2 px-4 rounded-lg"
									onClick={() => handleDelete(mejaData.id_meja)}
								>
									Confirm Deletion
								</button>
							</div>
						) : mode === "restore" ? (
							<div className="p-4">
								<button
									onClick={() => setIsNotifModalOpen(!isNotifModalOpen)}
									className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
								>
									<X className="w-6 h-6" />
								</button>
								<div className="p-6 text-center">
									<span className="text-lg font-bold">Restore this meja?</span>
									<div className="flex justify-center items-center w-full flex-col mt-4">
										<div className="font-bold text-xl truncate line-clamp-1 text-primary">
											Meja Nomor {mejaData.nomor_meja}
										</div>
									</div>

									<span className="text-lg text-center block mt-4">
										{mejaData._count.Transaksi} related transaksi to this meja
									</span>
								</div>
								<button
									className="w-full button-transition font-bold py-2 px-4 rounded-lg"
									onClick={() => handleRestore(mejaData.id_meja)}
								>
									Confirm Restoration
								</button>
							</div>
						) : null}
					</div>
				</div>
			)}
		</div>
	);
}
