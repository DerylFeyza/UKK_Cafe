"use server";
import { revalidatePath } from "next/cache";
import { createMeja, deleteMeja, updateMeja } from "../database/meja.query";

export const handleCreateMeja = async (no_meja: string) => {
	await createMeja({ nomor_meja: no_meja });
	revalidatePath("/", "layout");
};

export const handleUpdateMeja = async (id_meja: string, nomor_meja: string) => {
	try {
		await updateMeja({ id_meja }, { nomor_meja });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil memperbarui nomor meja" };
	} catch (error) {
		return { success: false, message: "Gagal memperbarui nomor meja" };
	}
};

export const handleDeleteMeja = async (id_meja: string) => {
	await deleteMeja({ id_meja });
	revalidatePath("/", "layout");
};
