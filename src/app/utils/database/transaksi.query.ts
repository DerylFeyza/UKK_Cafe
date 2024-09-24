import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
	return await prisma.transaksi.findMany({
		where: {
			status: "lunas",
		},
		orderBy: {
			tgl_transaksi: "desc",
		},
		include: {
			DetailTransaksi: {
				include: {
					Menu: {
						select: {
							nama_menu: true,
							harga: true,
						},
					},
				},
			},
			Meja: {
				select: {
					nomor_meja: true,
				},
			},
			User: {
				select: {
					nama_user: true,
				},
			},
		},
	});
};

export const getAllUncompleteTransaksi = async () => {
	return await prisma.transaksi.findMany({
		where: {
			status: "belum_bayar",
		},
		include: {
			DetailTransaksi: {
				include: {
					Menu: {
						select: {
							nama_menu: true,
							harga: true,
						},
					},
				},
			},
			Meja: {
				select: {
					nomor_meja: true,
				},
			},
			User: {
				select: {
					nama_user: true,
				},
			},
		},
	});
};

export const findUncompleteTransaksi = async (
	startDate: string,
	endDate: string
) => {
	return await prisma.transaksi.findMany({
		where: {
			AND: [
				{ status: "belum_bayar" },
				{
					tgl_transaksi: {
						gte: new Date(startDate),
						lte: new Date(endDate),
					},
				},
			],
		},
		include: {
			DetailTransaksi: {
				include: {
					Menu: {
						select: {
							nama_menu: true,
							harga: true,
						},
					},
				},
			},
			Meja: {
				select: {
					nomor_meja: true,
				},
			},
			User: {
				select: {
					nama_user: true,
				},
			},
		},
	});
};

export const findCompletedTransaksi = async (
	startDate: string,
	endDate: string
) => {
	return await prisma.transaksi.findMany({
		where: {
			AND: [
				{ status: "lunas" },
				{
					tgl_transaksi: {
						gte: new Date(startDate),
						lte: new Date(endDate),
					},
				},
			],
		},
		include: {
			DetailTransaksi: {
				include: {
					Menu: {
						select: {
							nama_menu: true,
							harga: true,
						},
					},
				},
			},
			Meja: {
				select: {
					nomor_meja: true,
				},
			},
			User: {
				select: {
					nama_user: true,
				},
			},
		},
	});
};

export const completeTransaction = async (
	where: Prisma.TransaksiWhereUniqueInput
) => {
	await prisma.transaksi.update({ where, data: { status: "lunas" } });
};
