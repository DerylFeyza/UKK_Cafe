"use client";
import { X } from "lucide-react";
import { UserWithTransaksiCount } from "../../../../types/user";
import { handleHardDeleteUser } from "@/app/utils/actions/user";
import { handleToastResponse } from "./ToastNotification";
export default function HardDeleteNotifs({
	isNotifModalOpen,
	setIsNotifModalOpen,
	userData,
}: {
	isNotifModalOpen: boolean;
	setIsNotifModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	userData: UserWithTransaksiCount;
}) {
	console.log(userData);
	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			setIsNotifModalOpen(!isNotifModalOpen);
		}
	};

	const handleDelete = async (id: string) => {
		const result = await handleHardDeleteUser(id);
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
						<div className="p-4">
							<button
								onClick={() => setIsNotifModalOpen(!isNotifModalOpen)}
								className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
							>
								<X className="w-6 h-6" />
							</button>
							<div className="p-6">
								<span className="text-lg font-bold">
									Are you sure you want to hard delete this user?
								</span>
								<div className="flex justify-center items-center w-full flex-col mt-4">
									<div className="font-bold text-xl truncate line-clamp-1 text-primary">
										{userData.nama_user}
									</div>
									<p className="text-gray-700 text-base line-clamp-1 ">
										{userData.username}
									</p>
									<div className="font-bold text-xl truncate line-clamp-1 text-primary">
										{userData.role}
									</div>
								</div>

								<span className="text-lg text-center block mt-4">
									{userData._count.Transaksi} related transaksi to this user
									will be deleted permanently
								</span>
							</div>
							<button
								className="w-full button-transition font-bold py-2 px-4 rounded-lg"
								onClick={() => handleDelete(userData.id_user)}
							>
								Confirm Deletion
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
