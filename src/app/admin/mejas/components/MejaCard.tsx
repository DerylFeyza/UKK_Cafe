"use client";
import { Meja } from "@prisma/client";
import { Trash, Edit3 } from "lucide-react"; // Adding Edit icon for the update button
import { useState } from "react";
import { handleDeleteMeja, handleUpdateMeja } from "@/app/utils/actions/meja";

export default function MejaCard({ mejaData }: { mejaData: Meja }) {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedMeja, setUpdatedMeja] = useState(mejaData.nomor_meja);

	const handleUpdate = async () => {
		if (updatedMeja !== mejaData.nomor_meja) {
			await handleUpdateMeja(mejaData.id_meja, updatedMeja);
		}
		setIsEditing(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleUpdate();
		}
	};

	return (
		<div className="w-52 h-16 rounded-lg overflow-hidden shadow-lg bg-white flex justify-between items-center px-4">
			{isEditing ? (
				<input
					type="text"
					value={updatedMeja}
					onChange={(e) => setUpdatedMeja(e.target.value)}
					onKeyDown={handleKeyPress}
					onBlur={() => setIsEditing(false)}
					maxLength={4}
					className="w-20 px-2 py-1 border border-tertiary rounded-md"
					autoFocus
				/>
			) : (
				<div className="font-bold text-xl truncate line-clamp-1 text-secondary text-center">
					{mejaData.nomor_meja}
				</div>
			)}
			<div className="flex flex-nowrap space-x-2">
				<button
					onClick={() => setIsEditing(!isEditing)}
					className="text-blue-600 button-transition p-2 rounded-lg"
				>
					<Edit3 className="w-5 h-5" />
				</button>
				<button
					onClick={() => handleDeleteMeja(mejaData.id_meja)}
					className="text-red-600 button-transition p-2 rounded-lg"
				>
					<Trash className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
}
