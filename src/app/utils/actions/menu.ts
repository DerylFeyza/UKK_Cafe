"use server";
import { revalidatePath } from "next/cache";
import {
	createMenu,
	updateMenu,
	findMenu,
	deleteMenu,
} from "../database/menu.query";
import { Jenis } from "@prisma/client";
import { handleImageDelete, imageUploader } from "./imageUpload";
import { createMenuSchema, updateMenuSchema } from "@/lib/validator/menu";

interface MenuUpdateData {
	nama_menu: string;
	jenis: Jenis;
	deskripsi: string;
	harga: number;
	gambar?: string;
}

interface MenuCreateData {
	nama_menu: string;
	jenis: Jenis;
	deskripsi: string;
	harga: number;
	gambar: string;
}

interface ToastNotificationProps {
	success: boolean;
	message: string;
}

export const handleCreateMenu = async (
	formData: FormData
): Promise<ToastNotificationProps> => {
	return new Promise(async (resolve) => {
		try {
			const menuData: MenuCreateData = {
				nama_menu: formData.get("nama_menu") as string,
				jenis: formData.get("jenis") as Jenis,
				deskripsi: formData.get("deskripsi") as string,
				harga: parseInt(formData.get("harga") as string),
				gambar: "",
			};

			const gambar = formData.get("gambar") as File;
			const validation = createMenuSchema.safeParse({
				...menuData,
				gambar: gambar,
			});
			if (!validation.success) {
				const errors = validation.error.flatten();
				const errorMessages = Object.values(errors.fieldErrors)
					.flat()
					.join(" ");
				return resolve({ success: false, message: errorMessages });
			}

			if (!gambar) {
				return resolve({
					success: false,
					message: "Gambar tidak boleh kosong",
				});
			}

			const urlGambar = await imageUploader(gambar);
			if (!urlGambar.success) {
				return resolve({ success: false, message: urlGambar.message });
			}

			if (urlGambar.url) {
				menuData.gambar = urlGambar.url;
			}

			await createMenu(menuData);
			revalidatePath("/", "layout");
			return resolve({ success: true, message: "Berhasil menambahkan menu" });
		} catch (error) {
			return resolve({ success: false, message: "Gagal memperbarui menu" });
		}
	});
};

export const handleUpdateMenu = async (
	id: string,
	formData: FormData
): Promise<ToastNotificationProps> => {
	return new Promise(async (resolve) => {
		try {
			let urlGambar;
			const gambar = formData.get("gambar") as File | null;
			const menu = await findMenu({ id_menu: id });

			const menuData: MenuUpdateData = {
				nama_menu: formData.get("nama_menu") as string,
				jenis: formData.get("jenis") as Jenis,
				deskripsi: formData.get("deskripsi") as string,
				harga: parseInt(formData.get("harga") as string),
			};

			const validation = updateMenuSchema.safeParse({
				...menuData,
				...(gambar instanceof File ? { gambar } : {}),
			});
			if (!validation.success) {
				const errors = validation.error.flatten();
				const errorMessages = Object.values(errors.fieldErrors)
					.flat()
					.join(" ");
				return resolve({ success: false, message: errorMessages });
			}

			if (menu && menu.gambar) {
				if (gambar) {
					const deleteResult = await handleImageDelete(menu.gambar);
					if (!deleteResult.success) {
						return resolve({ success: false, message: deleteResult.message });
					}
					urlGambar = await imageUploader(gambar);
					if (!urlGambar.success) {
						return resolve({ success: false, message: urlGambar.message });
					}
				}
			}

			if (urlGambar) {
				menuData.gambar = urlGambar.url;
			}

			await updateMenu({ id_menu: id }, menuData);
			revalidatePath("/", "layout");
			resolve({ success: true, message: "Berhasil memperbarui menu" });
		} catch (error) {
			resolve({ success: false, message: "Gagal memperbarui menu" });
		}
	});
};

export const handleDeleteMenu = async (
	id: string
): Promise<ToastNotificationProps> => {
	return new Promise(async (resolve) => {
		try {
			const menu = await findMenu({ id_menu: id });
			if (menu) {
				const deleteResult = await handleImageDelete(menu.gambar);
				if (!deleteResult.success) {
					return resolve({ success: false, message: deleteResult.message });
				}
			}

			await deleteMenu({ id_menu: id });
			revalidatePath("/", "layout");
			return resolve({ success: true, message: "Berhasil menghapus menu" });
		} catch (error) {
			return resolve({ success: false, message: "Gagal menghapus menu" });
		}
	});
};
