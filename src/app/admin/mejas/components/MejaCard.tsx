"use client";
import { Trash, Edit3, Upload } from "lucide-react";
import { useState } from "react";
import { handleDeleteMeja, handleUpdateMeja } from "@/app/utils/actions/meja";
import { handleToastResponse } from "@/app/components/general/ToastNotification";
import { MejaWithTransaksiCount } from "../../../../../types/meja";
import MejaNotifModal from "./MejaNotifModal";
export default function MejaCard({
	mejaData,
	mode,
}: {
	mejaData: MejaWithTransaksiCount;
	mode?: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedMeja, setUpdatedMeja] = useState(mejaData.nomor_meja);
	const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
	const [notifMode, setNotifMode] = useState<"delete" | "restore" | "">("");

	const handleUpdate = async () => {
		if (updatedMeja !== mejaData.nomor_meja) {
			const result = await handleUpdateMeja(mejaData.id_meja, updatedMeja);
			handleToastResponse(result);
		}
		setIsEditing(false);
	};

	const handleDelete = async () => {
		const result = await handleDeleteMeja(mejaData.id_meja);
		handleToastResponse(result);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleUpdate();
		}
	};

	const handleOpenNotifModal = (mode: "delete" | "restore") => {
		setNotifMode(mode);
		setIsNotifModalOpen(true);
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
			{!mode ? (
				<div className="flex flex-nowrap space-x-2">
					<button
						onClick={() => setIsEditing(!isEditing)}
						className="text-blue-600 button-transition p-2 rounded-lg"
					>
						<Edit3 className="w-5 h-5" />
					</button>
					<button
						onClick={() => handleDelete()}
						className="text-red-600 button-transition p-2 rounded-lg"
					>
						<Trash className="w-5 h-5" />
					</button>
				</div>
			) : (
				<div className="flex flex-nowrap space-x-2">
					<button
						className="text-blue-600 button-transition p-2 rounded-lg"
						onClick={() => handleOpenNotifModal("restore")}
					>
						<Upload className="w-5 h-5" />
					</button>
					<button
						onClick={() => handleOpenNotifModal("delete")}
						className="text-red-600 button-transition p-2 rounded-lg"
					>
						<Trash className="w-5 h-5" />
					</button>
					<div className="absolute">
						<MejaNotifModal
							isNotifModalOpen={isNotifModalOpen}
							setIsNotifModalOpen={setIsNotifModalOpen}
							mejaData={mejaData}
							mode={notifMode}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
