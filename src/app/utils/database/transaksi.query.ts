import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaksi = async (
	data: Prisma.TransaksiCreateInput,
	orderDetails: { id_menu: string; harga: number; jumlah: number }[]
) => {
	const createdTransaction = await prisma.transaksi.create({ data });
	const detailTransaksiData = orderDetails.map((detail) => ({
		id_transaksi: createdTransaction.id_transaksi,
		id_menu: detail.id_menu,
		harga: detail.harga,
		jumlah: detail.jumlah,
	}));

	await prisma.detailTransaksi.createMany({
		data: detailTransaksiData,
	});
};

export const getAllCompletedTransaksi = async () => {
	await prisma.transaksi.findMany({
		where: {
			status: "lunas",
		},
	});
};

export const getAllUncompleteTransaksi = async () => {
	await prisma.transaksi.findMany({
		where: {
			status: "belum_bayar",
		},
	});
};
