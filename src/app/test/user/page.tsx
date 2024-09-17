"use client";

import { useState } from "react";
import { handleCreateUser } from "@/app/utils/actions/user";
export default function UserForm() {
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

		await handleCreateUser(formData); // Call handleCreateUser directly
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
		>
			<div className="mb-4">
				<label
					htmlFor="nama_user"
					className="block text-sm font-medium text-gray-700"
				>
					Name
				</label>
				<input
					type="text"
					id="nama_user"
					value={namaUser}
					onChange={(e) => setNamaUser(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-700"
				>
					Role
				</label>
				<select
					id="role"
					value={role}
					onChange={(e) => setRole(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				>
					<option value="">Select Role</option>
					<option value="admin">Admin</option>
					<option value="kasir">User</option>
					<option value="manajer">User</option>
				</select>
			</div>
			<div className="mb-4">
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
