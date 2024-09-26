"use server";
import { revalidatePath } from "next/cache";
import { createUser, updateUser, deleteUser } from "../database/user.query";
import { Role } from "@prisma/client";
import { encrypt } from "../bcrypt";
import { createUserSchema, updateUserSchema } from "@/lib/validator/user";

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

		const validation = createUserSchema.safeParse({
			...userData,
			password: formData.get("password") as string,
		});
		if (!validation.success) {
			const errors = validation.error.flatten();
			const errorMessages = Object.values(errors.fieldErrors).flat().join(" ");
			return { success: false, message: errorMessages };
		}

		await createUser(userData);
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil membuat user" };
	} catch (error) {
		return { success: false, message: "Gagal membuat user" };
	}
};

export const handleUpdateUser = async (id: string, formData: FormData) => {
	try {
		const userData: userField = {
			nama_user: formData.get("nama_user") as string,
			role: formData.get("role") as Role,
			username: formData.get("username") as string,
		};

		let hashedPass;
		if (formData.get("password")) {
			hashedPass = await encrypt(formData.get("password") as string);
		}

		const validation = updateUserSchema.safeParse({
			...userData,
			...(hashedPass ? { password: formData.get("password") } : {}),
		});

		if (!validation.success) {
			const errors = validation.error.flatten();
			const errorMessages = Object.values(errors.fieldErrors).flat().join(" ");
			return { success: false, message: errorMessages };
		}

		if (hashedPass) {
			userData.password = hashedPass;
		}
		await updateUser({ id_user: id }, userData);
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil mengupdate user" };
	} catch (error) {
		return { success: false, message: "Gagal mengupdate user" };
	}
};

export const handleDeleteUser = async (id: string) => {
	try {
		await deleteUser({ id_user: id });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menghapus user" };
	} catch (error) {
		return { success: false, message: "Gagall menghapus user" };
	}
};
