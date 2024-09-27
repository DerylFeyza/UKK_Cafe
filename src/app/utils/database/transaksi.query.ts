import prisma from "@/lib/prisma";
import { Prisma, Status } from "@prisma/client";
import { TransaksiType } from "../../../../types/transaksi";
interface Session {
	role: string;
	id_user: string;
}

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

const filterTransaksiByRoleAndDate = async (
	session: Session,
	baseQuery: any,
	startDate?: string,
	endDate?: string
) => {
	if (startDate && endDate) {
		baseQuery.where.AND = [
			...(baseQuery.where.AND || []),
			{
				tgl_transaksi: {
					gte: new Date(startDate),
					lte: new Date(endDate),
				},
			},
		];
	}

	if (session.role === "kasir") {
		return await prisma.transaksi.findMany({
			...baseQuery,
			where: {
				...baseQuery.where,
				id_user: session.id_user,
			},
		});
	} else if (session.role === "admin" || session.role === "manajer") {
		return await prisma.transaksi.findMany(baseQuery);
	}
};

export const getAllTransaksi = async (
	session: Session,
	status: "lunas" | "belum_bayar",
	startDate?: string,
	endDate?: string
): Promise<TransaksiType[]> => {
	const baseQuery = {
		where: {
			AND: [
				{
					status: status as Status,
				},
			],
		},
		orderBy: {
			tgl_transaksi: status === "lunas" ? "desc" : "asc",
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
	};

	return (await filterTransaksiByRoleAndDate(
		session,
		baseQuery,
		startDate,
		endDate
	)) as unknown as TransaksiType[];
};

export const completeTransaction = async (
	where: Prisma.TransaksiWhereUniqueInput
) => {
	await prisma.transaksi.update({ where, data: { status: "lunas" } });
};
