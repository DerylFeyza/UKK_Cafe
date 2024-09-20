"use client";
import { User } from "@prisma/client";
import UserDetailModal from "./UserDetailModal";
import { useState } from "react";
export default function UserCard({ userData }: { userData: User }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
							<button
								className="button-transition rounded-full px-4 py-2 flex items-center space-x-2"
								aria-label="Add to cart"
								onClick={() => setIsModalOpen(true)}
							>
								<span className="font-semibold">Details</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<UserDetailModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				initialData={userData}
			/>
		</div>
	);
}
