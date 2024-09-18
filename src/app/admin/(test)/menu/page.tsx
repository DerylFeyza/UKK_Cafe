"use client";

import { handleCreateMenu } from "@/app/utils/actions/menu";
import { useState } from "react";

export default function CreateMenuForm() {
	const [namaMenu, setNamaMenu] = useState("");
	const [jenis, setJenis] = useState("");
	const [deskripsi, setDeskripsi] = useState("");
	const [harga, setHarga] = useState("");
	const [file, setFile] = useState<File | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!file) {
			alert("Please upload an image.");
			return;
		}

		const formData = new FormData();
		formData.append("nama_menu", namaMenu);
		formData.append("jenis", jenis);
		formData.append("deskripsi", deskripsi);
		formData.append("harga", harga);
		formData.append("gambar", file);

		// Call the server action to create the menu
		await handleCreateMenu(formData);

		// Clear the form after submission
		setNamaMenu("");
		setJenis("");
		setDeskripsi("");
		setHarga("");
		setFile(null);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
		>
			<div className="mb-4">
				<label
					htmlFor="nama_menu"
					className="block text-sm font-medium text-gray-700"
				>
					Menu Name
				</label>
				<input
					type="text"
					id="nama_menu"
					value={namaMenu}
					onChange={(e) => setNamaMenu(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="Jenis"
					className="block text-sm font-medium text-gray-700"
				>
					Jenis
				</label>
				<select
					id="Jenis"
					value={jenis}
					onChange={(e) => setJenis(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				>
					<option value="">Select Jenis</option>
					<option value="makanan">Makanan</option>
					<option value="minuman">Minuman</option>
				</select>
			</div>
			<div className="mb-4">
				<label
					htmlFor="deskripsi"
					className="block text-sm font-medium text-gray-700"
				>
					Deskripsi
				</label>
				<textarea
					id="deskripsi"
					value={deskripsi}
					onChange={(e) => setDeskripsi(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				></textarea>
			</div>

			<div className="mb-4">
				<label
					htmlFor="harga"
					className="block text-sm font-medium text-gray-700"
				>
					Harga
				</label>
				<input
					type="number"
					id="harga"
					value={harga}
					onChange={(e) => setHarga(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="file"
					className="block text-sm font-medium text-gray-700"
				>
					Upload Image
				</label>
				<input
					type="file"
					id="file"
					accept="image/*"
					onChange={(e) => setFile(e.target.files?.[0] || null)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>

			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
			>
				Submit
			</button>
		</form>
	);
}
