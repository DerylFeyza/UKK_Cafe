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
	const hashedPassword = await encrypt(formData.get("password") as string);
	const userData = {
		nama_user: formData.get("nama_user") as string,
		role: formData.get("role") as Role,
		username: formData.get("username") as string,
		password: hashedPassword,
	};

	await createUser(userData);
	revalidatePath("/", "layout");
};

export const handleUpdateUser = async (id: string, formData: FormData) => {
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
};

export const handleDeleteUser = async (id: string) => {
	await deleteUser({ id_user: id });
	revalidatePath("/", "layout");
};
