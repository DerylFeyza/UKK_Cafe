"use client";

import { useState } from "react";
import { handleCreateUser } from "@/app/utils/actions/user";
import { handleToastResponse } from "@/app/components/general/ToastNotification";
export default function AddUserForm() {
	const [namaUser, setNamaUser] = useState("");
	const [role, setRole] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("nama_user", namaUser);
		formData.append("role", role);
		formData.append("username", username);
		formData.append("password", password);

		const result = await handleCreateUser(formData);
		console.log(result);

		setNamaUser("");
		setRole("");
		setUsername("");
		setPassword("");
		handleToastResponse(result);
	};

	return (
		<div className="bg-white shadow-lg rounded-lg">
			<div className="p-8">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<h2 className="text-2xl font-bold text-secondary mb-6">Add User</h2>

					<div className="space-y-1">
						<label
							htmlFor="nama-user"
							className="block text-sm font-medium text-secondary"
						>
							Nama User
						</label>
						<input
							type="text"
							id="nama-user"
							value={namaUser}
							onChange={(e) => setNamaUser(e.target.value)}
							required
							className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
						/>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-secondary"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							value={username}
							required
							onChange={(e) => setUsername(e.target.value)}
							className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
						/>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="Role"
							className="block text-sm font-medium text-secondary"
						>
							Role
						</label>
						<select
							id="Role"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
							required
						>
							<option value="">Pilih Role</option>
							<option value="kasir">Kasir</option>
							<option value="manajer">Manajer</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-secondary"
						>
							Password
						</label>
						<input
							type="text"
							id="password"
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
							className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
