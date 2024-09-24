"use server";
import { revalidatePath } from "next/cache";
import {
	createTransaksi,
	completeTransaction,
} from "../database/transaksi.query";
import { Status } from "@prisma/client";

export const handleCreateTransaksi = async (
	formData: FormData,
	orderDetails: { id_menu: string; harga: number; jumlah: number }[]
) => {
	const transaksiData = {
		tgl_transaksi: new Date(),
		nama_pelanggan: formData.get("nama_pelanggan") as string,
		total: parseInt(formData.get("total") as string),
		status: formData.get("status") as Status,
		User: {
			connect: { id_user: formData.get("id_user") as string },
		},
		Meja: {
			connect: { id_meja: formData.get("id_meja") as string },
		},
	};

	await createTransaksi(transaksiData, orderDetails);
	revalidatePath("/", "layout");
};

export const handleCompleteTransaksi = async (id_transaksi: string) => {
	await completeTransaction({ id_transaksi });
	revalidatePath("/", "layout");
};