"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { handleUpdateUser, handleDeleteUser } from "@/app/utils/actions/user";
import { handleToastResponse } from "@/app/components/general/ToastNotification";
interface UpdateUserData {
	id_user: string;
	nama_user: string;
	username: string;
	role: string;
	password: string;
}

export default function UserDetailModal({
	isModalOpen,
	setIsModalOpen,
	initialData,
}: {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	initialData: UpdateUserData;
}) {
	const [namaUser, setNamaUser] = useState(initialData.nama_user);
	const [username, setUsername] = useState(initialData.username);
	const [role, setRole] = useState(initialData.role);
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const toggleModal = () => {
		setNamaUser(initialData.nama_user);
		setUsername(initialData.username);
		setRole(initialData.role);
		setPassword("");
		setIsModalOpen(!isModalOpen);
		setIsPasswordVisible(false);
	};

	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			setNamaUser(initialData.nama_user);
			setUsername(initialData.username);
			setRole(initialData.role);
			setPassword("");
			setIsModalOpen(false);
			setIsPasswordVisible(false);
		}
	};

	const handleDelete = async (id: string) => {
		const result = await handleDeleteUser(id);
		handleToastResponse(result);
		setIsModalOpen(false);
	};

	const handleSubmitUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("nama_user", namaUser);
		formData.append("username", username);
		formData.append("role", role);
		if (isPasswordVisible) {
			formData.append("password", password);
		}

		const result = await handleUpdateUser(initialData.id_user, formData);
		handleToastResponse(result);

		setIsPasswordVisible(false);
		setPassword("");
		setIsModalOpen(false);
	};

	return (
		<form onSubmit={handleSubmitUpdate}>
			{isModalOpen && (
				<div
					className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4"
					onClick={handleOverlayClick}
				>
					<div
						className="bg-white rounded-lg shadow-xl max-w-lg w-full relative overflow-hidden transform transition-all duration-300 ease-in-out"
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

						<div className="p-6">
							<div className="space-y-4">
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
										onChange={(e) => setUsername(e.target.value)}
										className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
										required
									/>
								</div>

								<div className="space-y-1">
									<label
										htmlFor="role"
										className="block text-sm font-medium text-secondary"
									>
										Role
									</label>
									<select
										id="role"
										value={role}
										onChange={(e) => setRole(e.target.value)}
										className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
										required
									>
										<option value="">Select Role</option>
										<option value="admin">Admin</option>
										<option value="kasir">Kasir</option>
										<option value="manajer">Manajer</option>
									</select>
								</div>

								<button
									type="button"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
									className="text-secondary font-semibold"
								>
									{isPasswordVisible ? "Cancel" : "Change Password"}
								</button>

								{isPasswordVisible && (
									<div className="space-y-1">
										<label
											htmlFor="password"
											className="block text-sm font-medium text-secondary"
										>
											Password
										</label>
										<input
											type="password"
											id="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
											required
										/>
									</div>
								)}
							</div>

							<div className="mt-6 flex space-x-4">
								<button
									type="submit"
									className="w-full button-transition font-bold py-2 px-4 rounded-lg"
								>
									Update User
								</button>
								<button
									type="button"
									className="w-full button-transition font-bold py-2 px-4 rounded-lg"
									onClick={() => handleDelete(initialData.id_user)}
								>
									Delete User
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
