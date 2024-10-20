"use server";
import { revalidatePath } from "next/cache";
import {
	createUser,
	updateUser,
	deleteUser,
	hardDeleteuser,
} from "../database/user.query";
import { Role } from "@prisma/client";
import { encrypt } from "../bcrypt";
import { createUserSchema, updateUserSchema } from "@/lib/validator/user";
import { nextGetServerSession } from "@/lib/next-auth";

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
		//@ts-expect-error error type
		if (error.code === "P2002") {
			return {
				success: false,
				message:
					"Username sudah terdaftar dalam aplikasi atau terdapat dalam transaksi",
			};
		}
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
		//@ts-expect-error error type
		if (error.code === "P2002") {
			return {
				success: false,
				message:
					"Username sudah terdaftar dalam aplikasi atau terdapat dalam transaksi",
			};
		}
		return { success: false, message: "Gagal mengupdate user" };
	}
};

export const handleDeleteUser = async (id: string) => {
	try {
		const session = await nextGetServerSession();
		if (session?.user?.id_user === id) {
			return { success: false, message: "you cannot delete yourself" };
		}

		await deleteUser({ id_user: id });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menghapus user" };
	} catch (error) {
		return { success: false, message: "Gagall menghapus user" };
	}
};

export const handleHardDeleteUser = async (id: string) => {
	try {
		await hardDeleteuser({ id_user: id });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menghapus user" };
	} catch (error) {
		return { success: false, message: "Gagal menghapus user" };
	}
};
