"use client";
import { UserWithTransaksiCount } from "../../../../../types/user";
import UserDetailModal from "./UserDetailModal";
import HardDeleteNotifs from "@/app/admin/users/components/HardDeleteNotifs";
import { useState } from "react";
export default function UserCard({
	userData,
	showDeleted,
}: {
	userData: UserWithTransaksiCount;
	showDeleted?: string;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

	return (
		<div>
			<div className="w-72 rounded-lg overflow-hidden shadow-lg bg-white">
				<div className="px-6 py-4">
					<div className="font-bold text-xl truncate line-clamp-1 text-secondary">
						{userData.nama_user}
					</div>
					<p className="text-gray-700 text-base line-clamp-1 min-h-[3rem]">
						{userData.username}
					</p>
					<div>
						<div className="font-bold text-x text-primary flex items-center justify-between">
							{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
							{showDeleted ? (
								<button
									className="button-transition rounded-full px-4 py-2 flex items-center space-x-2"
									onClick={() => setIsNotifModalOpen(true)}
								>
									<span className="font-semibold">Hard Delete</span>
								</button>
							) : (
								<button
									className="button-transition rounded-full px-4 py-2 flex items-center space-x-2"
									onClick={() => setIsModalOpen(true)}
								>
									<span className="font-semibold">Details</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			<UserDetailModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				initialData={userData}
			/>
			<HardDeleteNotifs
				isNotifModalOpen={isNotifModalOpen}
				setIsNotifModalOpen={setIsNotifModalOpen}
				userData={userData}
			/>
		</div>
	);
}
