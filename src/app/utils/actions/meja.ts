"use server";
import { revalidatePath } from "next/cache";
import {
	createMeja,
	deleteMeja,
	updateMeja,
	hardDeleteMeja,
	restoreMeja,
} from "../database/meja.query";
import { MejaFormSchema } from "@/lib/validator/meja";
export const handleCreateMeja = async (no_meja: string) => {
	try {
		await createMeja({ nomor_meja: no_meja });

		const validation = MejaFormSchema.safeParse({
			nomor_meja: no_meja,
		});

		if (!validation.success) {
			const errors = validation.error.flatten();
			const errorMessages = Object.values(errors.fieldErrors).flat().join(" ");
			return { success: false, message: errorMessages };
		}
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menambahkan meja" };
	} catch (error) {
		//@ts-expect-error error type
		if (error.code === "P2002") {
			return {
				success: false,
				message:
					"Meja sudah terdaftar dalam aplikasi atau terdapat dalam transaksi",
			};
		}
		return { success: false, message: "Gagal menambahkan meja" };
	}
};

export const handleUpdateMeja = async (id_meja: string, nomor_meja: string) => {
	try {
		await updateMeja({ id_meja }, { nomor_meja });
		const validation = MejaFormSchema.safeParse({
			nomor_meja: nomor_meja,
		});

		if (!validation.success) {
			const errors = validation.error.flatten();
			const errorMessages = Object.values(errors.fieldErrors).flat().join(" ");
			return { success: false, message: errorMessages };
		}

		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil memperbarui nomor meja" };
	} catch (error) {
		//@ts-expect-error error type
		if (error.code === "P2002") {
			return {
				success: false,
				message:
					"Meja sudah terdaftar dalam aplikasi atau terdapat dalam transaksi",
			};
		}
		return { success: false, message: "Gagal memperbarui nomor meja" };
	}
};

export const handleRestoreMeja = async (id_meja: string) => {
	try {
		await restoreMeja({ id_meja });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil restore meja" };
	} catch (error) {
		return { success: false, message: "Gagal restore meja" };
	}
};

export const handleDeleteMeja = async (id_meja: string) => {
	try {
		await deleteMeja({ id_meja });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menghapus meja" };
	} catch (error) {
		return { success: false, message: "Gagal menghapus meja" };
	}
};

export const handleHardDeleteMeja = async (id_meja: string) => {
	try {
		await hardDeleteMeja({ id_meja });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menghapus meja" };
	} catch (error) {
		return { success: false, message: "Gagal menghapus meja" };
	}
};
