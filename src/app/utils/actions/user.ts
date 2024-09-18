"use server";
import { revalidatePath } from "next/cache";
import { createUser, updateUser } from "../database/user.query";
import { Role } from "@prisma/client";
import { encrypt } from "../bcrypt";
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
	const hashedPassword = await encrypt(formData.get("password") as string);
	const userData = {
		nama_user: formData.get("nama_user") as string,
		role: formData.get("role") as Role,
		username: formData.get("username") as string,
		password: hashedPassword,
	};

	await updateUser({ id_user: id }, userData);
	revalidatePath("/", "layout");
};
