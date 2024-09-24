"use client";
import { X, Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { handleUpdateMenu, handleDeleteMenu } from "@/app/utils/actions/menu";

interface UpdateData {
	id_menu: string;
	nama_menu: string;
	jenis: string;
	deskripsi: string;
	harga: string;
	gambar: string;
}

export default function DetailModal({
	isModalOpen,
	setIsModalOpen,
	initialData,
	path,
}: {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	initialData: UpdateData;
	path: "admin" | "manajer";
}) {
	const [namaMenu, setNamaMenu] = useState(initialData.nama_menu);
	const [jenis, setJenis] = useState(initialData.jenis);
	const [deskripsi, setDeskripsi] = useState(initialData.deskripsi);
	const [harga, setHarga] = useState(initialData.harga);
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const toggleModal = () => {
		setNamaMenu(initialData.nama_menu);
		setDeskripsi(initialData.deskripsi);
		setHarga(initialData.harga);
		setJenis(initialData.jenis);
		setIsModalOpen(!isModalOpen);
		setImagePreview(null);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setFile(null);
			setIsModalOpen(false);
			setImagePreview(null);
		}
	};

	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			setNamaMenu(initialData.nama_menu);
			setDeskripsi(initialData.deskripsi);
			setHarga(initialData.harga);
			setJenis(initialData.jenis);
			setIsModalOpen(false);
			setImagePreview(null);
		}
	};

	const handleDelete = async (id_menu: string) => {
		await handleDeleteMenu(id_menu);
		setIsModalOpen(false);
	};

	const handleSubmitUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("nama_menu", namaMenu);
		formData.append("jenis", jenis);
		formData.append("deskripsi", deskripsi!);
		formData.append("harga", harga);
		if (file) {
			formData.append("gambar", file);
		}

		await handleUpdateMenu(initialData.id_menu, formData);

		setIsModalOpen(false);
		setImagePreview(null);
		setFile(null);
	};

	return (
		<form onSubmit={handleSubmitUpdate}>
			{isModalOpen && (
				<div
					className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4"
					onClick={handleOverlayClick}
				>
					<div
						className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative overflow-hidden transform transition-all duration-300 ease-in-out"
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

						<div className="flex flex-col md:flex-row">
							<div className="md:w-1/2 p-6">
								<div className="relative rounded-md overflow-hidden mb-6">
									{imagePreview ? (
										<Image
											src={imagePreview}
											alt={initialData.nama_menu}
											width={400}
											height={400}
											className="w-full h-56 object-cover"
										/>
									) : (
										<Image
											src={`/menu/${initialData.gambar}`}
											alt={initialData.nama_menu}
											width={400}
											height={400}
											className="w-full h-56 object-cover"
										/>
									)}
								</div>
								{path === "admin" && (
									<div className="flex items-center">
										<label
											htmlFor="gambar"
											className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer"
										>
											<Upload className="w-5 h-5 mr-2" />
											Update Image
										</label>
										<input
											type="file"
											id="gambar"
											accept="image/*"
											onChange={handleImageChange}
											className="hidden"
										/>
									</div>
								)}
							</div>
							<div className="md:w-1/2 p-6">
								<div className="h-full flex flex-col">
									<div className="flex-grow space-y-4">
										<div className="space-y-1">
											<label
												htmlFor="nama-menu"
												className="block text-sm font-medium text-secondary"
											>
												Nama Menu
											</label>
											<input
												type="text"
												id="nama-menu"
												value={namaMenu}
												onChange={(e) => setNamaMenu(e.target.value)}
												className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
											/>
										</div>

										<div className="space-y-1">
											<label
												htmlFor="Jenis"
												className="block text-sm font-medium text-secondary"
											>
												Jenis
											</label>
											<select
												id="Jenis"
												value={jenis}
												onChange={(e) => setJenis(e.target.value)}
												className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
												required
											>
												<option value="">Pilih Jenis</option>
												<option value="makanan">Makanan</option>
												<option value="minuman">Minuman</option>
											</select>
										</div>

										<div className="space-y-1">
											<label
												htmlFor="deskripsi-menu"
												className="block text-sm font-medium text-secondary"
											>
												Deskripsi Menu
											</label>
											<textarea
												id="deskripsi-menu"
												rows={4}
												value={deskripsi}
												onChange={(e) => setDeskripsi(e.target.value)}
												className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
												required
											></textarea>
										</div>

										<div className="space-y-1">
											<label
												htmlFor="harga"
												className="block text-sm font-medium text-secondary"
											>
												Harga
											</label>
											<input
												type="number"
												id="harga"
												value={harga}
												onChange={(e) => setHarga(e.target.value)}
												className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
											/>
										</div>
									</div>
									{path === "admin" && (
										<div className="mt-6 flex space-x-4">
											<button
												type="submit"
												className="w-full button-transition font-bold py-2 px-4 rounded-lg"
											>
												Update Menu
											</button>
											<button
												type="button"
												className="w-full button-transition font-bold py-2 px-4 rounded-lg"
												onClick={() => handleDelete(initialData.id_menu)}
											>
												Delete Menu
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
