"use client";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedMeja } from "@/redux/slices/mejaSlice";
export default function SelectMejaModal({
	isModalOpen,
	setIsModalOpen,
}: {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dispatch = useDispatch();
	const mejaList = useSelector((state: RootState) => state.mejaList.mejaList);
	const selectedMeja = useSelector(
		(state: RootState) => state.mejaList.selectedMeja?.id_meja
	);

	const handleSelectMeja = (id_meja: string, nomor_meja: string) => {
		dispatch(setSelectedMeja({ id_meja, nomor_meja }));
	};

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
						className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative overflow-hidden transform transition-all duration-300 ease-in-out"
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

						<div className="p-6 w-full flex-wrap flex gap-2">
							{mejaList.map((meja) => (
								<div key={meja.id_meja}>
									<button
										type="button"
										className={`w-20 h-16 rounded-md border-2 shadow-sm transition duration-300 ${
											selectedMeja === meja.id_meja
												? "bg-primary text-white border-primary"
												: "bg-tertiary text-secondary border-tertiary"
										}`}
										onClick={() =>
											handleSelectMeja(meja.id_meja, meja.nomor_meja)
										}
									>
										<div className="font-bold text-xl truncate line-clamp-1 text-secondary text-center">
											{meja.nomor_meja}
										</div>
									</button>
								</div>
							))}
						</div>

						<div className="p-6">
							<div className="space-y-4"></div>

							<div className="mt-6 flex space-x-4 justify-end">
								<button
									onClick={toggleModal}
									type="button"
									className="button-transition font-bold py-2 px-4 rounded-lg"
								>
									Select Meja
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
