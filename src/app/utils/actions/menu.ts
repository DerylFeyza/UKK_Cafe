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

export const handleCreateMenu = async (formData: FormData) => {
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
};

export const handleUpdateMenu = async (id: string, formData: FormData) => {
	let namaGambar;
	const gambar = formData.get("gambar") as File;
	const menu = await findMenu({ id_menu: id });

	if (menu) {
		if (menu.gambar) {
			await handleImageDelete(menu.gambar);
		}
		namaGambar = await handleImageUpload(gambar);
	}

	const menuData = {
		nama_menu: formData.get("nama_menu") as string,
		jenis: formData.get("jenis") as Jenis,
		deskripsi: formData.get("deskripsi") as string,
		gambar: namaGambar as string,
		harga: parseInt(formData.get("harga") as string),
	};

	await updateMenu({ id_menu: id }, menuData);
	revalidatePath("/", "layout");
};

export const handleDeleteMenu = async (id: string) => {
	const menu = await findMenu({ id_menu: id });
	if (menu) {
		await handleImageDelete(menu.gambar);
	}

	await deleteMenu({ id_menu: id });
	revalidatePath("/", "layout");
};
