"use server";
import { revalidatePath } from "next/cache";
import { createUser, updateUser, deleteUser } from "../database/user.query";
import { Role } from "@prisma/client";
import { encrypt } from "../bcrypt";

interface userField {
	nama_user: string;
	role: Role;
	username: string;
	password?: string;
}

export const handleCreateUser = async (formData: FormData) => {
	try {
		const hashedPassword = await encrypt(formData.get("password") as string);
		const userData = {
			nama_user: formData.get("nama_user") as string,
			role: formData.get("role") as Role,
			username: formData.get("username") as string,
			password: hashedPassword,
		};

		await createUser(userData);
		revalidatePath("/", "layout");
		return { success: true, message: "User created successfully" };
	} catch (error) {
		return { success: false, message: "Failed to create user" };
	}
};

export const handleUpdateUser = async (id: string, formData: FormData) => {
	try {
		let hashedPass;
		if (formData.get("password")) {
			hashedPass = await encrypt(formData.get("password") as string);
		}
		const userData: userField = {
			nama_user: formData.get("nama_user") as string,
			role: formData.get("role") as Role,
			username: formData.get("username") as string,
		};
		if (hashedPass) {
			userData.password = hashedPass;
		}
		await updateUser({ id_user: id }, userData);
		revalidatePath("/", "layout");
		return { success: true, message: "User updated successfully" };
	} catch (error) {
		return { success: false, message: "Failed to update user" };
	}
};

export const handleDeleteUser = async (id: string) => {
	try {
		await deleteUser({ id_user: id });
		revalidatePath("/", "layout");
		return { success: true, message: "User deleted successfully" };
	} catch (error) {
		return { success: false, message: "Failed to delete user" };
	}
};
