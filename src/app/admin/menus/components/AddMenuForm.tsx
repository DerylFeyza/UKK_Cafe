"use client";

import { useState } from "react";
import Image from "next/image";
import { handleCreateMenu } from "@/app/utils/actions/menu";
import {
	handlePromiseToast,
	handleToastResponse,
} from "@/app/components/general/ToastNotification";
export default function AddMenuForm() {
	const [namaMenu, setNamaMenu] = useState("");
	const [jenis, setJenis] = useState("");
	const [deskripsi, setDeskripsi] = useState("");
	const [harga, setHarga] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

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
			setImagePreview(null);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!file) {
			handleToastResponse({
				success: false,
				message: "Gambar tidak boleh kosong",
			});
			return;
		}

		const formData = new FormData();
		formData.append("nama_menu", namaMenu);
		formData.append("jenis", jenis);
		formData.append("deskripsi", deskripsi);
		formData.append("harga", harga);
		formData.append("gambar", file);

		await handlePromiseToast(handleCreateMenu(formData), "Menambahkan menu...");

		setNamaMenu("");
		setJenis("");
		setDeskripsi("");
		setHarga("");
		setImagePreview(null);
		setFile(null);
	};

	return (
		<div className="bg-white shadow-md rounded-lg mb-2">
			<div className="p-8">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<h2 className="text-2xl font-bold text-secondary mb-6">Add Menu</h2>

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

					<div className="space-y-1">
						<label
							htmlFor="gambar"
							className="block text-sm font-medium text-secondary"
						>
							Gambar
						</label>
						<div className="flex items-center">
							<label
								htmlFor="gambar"
								className="cursor-pointer px-4 py-2 rounded-md button-transition"
							>
								Browse
							</label>
							<input
								type="file"
								id="gambar"
								accept="image/*"
								onChange={handleImageChange}
								className="hidden"
							/>
							<span className="ml-3 text-sm text-gray-500">
								{imagePreview ? "Image selected" : "No file chosen"}
							</span>
						</div>
					</div>

					{imagePreview && (
						<div className="mt-4 border-2 border-tertiary rounded-md overflow-hidden">
							<div className="relative w-100 ">
								<Image
									src={imagePreview}
									width={400}
									height={400}
									alt="Preview"
									className="w-full h-80 object-cover"
								/>
							</div>
						</div>
					)}

					<button
						type="submit"
						className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium button-transition"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
