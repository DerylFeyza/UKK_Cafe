"use client";

import { useState } from "react";
import { handleCreateMeja } from "@/app/utils/actions/meja";
import { handleToastResponse } from "@/app/components/general/ToastNotification";
export default function AddMejaForm() {
	const [noMeja, setNoMeja] = useState("");
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await handleCreateMeja(noMeja);
		handleToastResponse(result);
		setNoMeja("");
	};

	return (
		<div className="bg-white shadow-lg rounded-lg">
			<div className="p-8">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<h2 className="text-2xl font-bold text-secondary mb-6">Add Meja</h2>

					<div className="space-y-1">
						<label
							htmlFor="nama-user"
							className="block text-sm font-medium text-secondary"
						>
							Nomor Meja
						</label>
						<input
							type="text"
							id="nama-user"
							value={noMeja}
							onChange={(e) => setNoMeja(e.target.value)}
							maxLength={4}
							className=" block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
							required
						/>
					</div>

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
