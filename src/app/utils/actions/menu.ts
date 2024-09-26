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

interface MenuUpdateData {
	nama_menu: string;
	jenis: Jenis;
	deskripsi: string;
	harga: number;
	gambar?: string;
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
			let urlGambar;
			const gambar = formData.get("gambar") as File;
			if (gambar) {
				urlGambar = await imageUploader(gambar);
				if (!urlGambar.success) {
					return resolve({ success: false, message: "Terjadi Kesalahan" });
				}
			} else {
				return resolve({
					success: false,
					message: "Gambar tidak boleh kosong",
				});
			}

			if (parseInt(formData.get("harga") as string) <= 0) {
				resolve({ success: false, message: "Gagal menambahkan menu" });
			}

			const menuData = {
				nama_menu: formData.get("nama_menu") as string,
				jenis: formData.get("jenis") as Jenis,
				deskripsi: formData.get("deskripsi") as string,
				gambar: urlGambar.url as string,
				harga: parseInt(formData.get("harga") as string),
			};

			await createMenu(menuData);
			revalidatePath("/", "layout");
			resolve({ success: true, message: "Berhasil menambahkan menu" });
		} catch (error) {
			resolve({ success: false, message: "Gagal menambahkan menu" });
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

			if (menu && menu.gambar) {
				if (gambar) {
					const deleteResult = await handleImageDelete(menu.gambar);
					if (!deleteResult.success) {
						return resolve({ success: false, message: "Terjadi Kesalahan" });
					}
					urlGambar = await imageUploader(gambar);
					if (!urlGambar.success) {
						return resolve({ success: false, message: "Terjadi Kesalahan" });
					}
				}
			}

			const menuData: MenuUpdateData = {
				nama_menu: formData.get("nama_menu") as string,
				jenis: formData.get("jenis") as Jenis,
				deskripsi: formData.get("deskripsi") as string,
				harga: parseInt(formData.get("harga") as string),
			};

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
					return resolve({ success: false, message: "Terjadi Kesalahan" });
				}
			}

			await deleteMenu({ id_menu: id });
			revalidatePath("/", "layout");
			resolve({ success: true, message: "Berhasil menghapus menu" });
		} catch (error) {
			resolve({ success: false, message: "Gagal menghapus menu" });
		}
	});
};
