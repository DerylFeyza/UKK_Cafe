"use server";
import { revalidatePath } from "next/cache";
import {
	createMenu,
	updateMenu,
	findMenu,
	deleteMenu,
} from "../database/menu.query";
import { Jenis } from "@prisma/client";
import { handleImageDelete, handleImageUpload } from "./imageUpload";

interface MenuUpdateData {
	nama_menu: string;
	jenis: Jenis;
	deskripsi: string;
	harga: number;
	gambar?: string;
}

export const handleCreateMenu = async (formData: FormData) => {
	try {
		let namaGambar;
		const gambar = formData.get("gambar") as File;
		if (gambar) {
			namaGambar = await handleImageUpload(gambar);
		}

		const menuData = {
			nama_menu: formData.get("nama_menu") as string,
			jenis: formData.get("jenis") as Jenis,
			deskripsi: formData.get("deskripsi") as string,
			gambar: namaGambar as string,
			harga: parseInt(formData.get("harga") as string),
		};

		await createMenu(menuData);
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menambahkan menu" };
	} catch (error) {
		return { success: false, message: "Gagal menambahkan menu" };
	}
};

export const handleUpdateMenu = async (id: string, formData: FormData) => {
	try {
		let namaGambar: string | undefined;
		const gambar = formData.get("gambar") as File | null;
		const menu = await findMenu({ id_menu: id });

		if (menu && menu.gambar) {
			if (gambar) {
				await handleImageDelete(menu.gambar);
				namaGambar = await handleImageUpload(gambar);
			}
		}

		const menuData: MenuUpdateData = {
			nama_menu: formData.get("nama_menu") as string,
			jenis: formData.get("jenis") as Jenis,
			deskripsi: formData.get("deskripsi") as string,
			harga: parseInt(formData.get("harga") as string),
		};

		if (namaGambar) {
			menuData.gambar = namaGambar;
		}

		await updateMenu({ id_menu: id }, menuData);
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil memperbarui menu" };
	} catch (error) {
		return { success: false, message: "Gagal memperbarui menu" };
	}
};

export const handleDeleteMenu = async (id: string) => {
	try {
		const menu = await findMenu({ id_menu: id });
		if (menu) {
			await handleImageDelete(menu.gambar);
		}

		await deleteMenu({ id_menu: id });
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil menghapus menu" };
	} catch (error) {
		return { success: false, message: "Gagal menghapus menu" };
	}
};
