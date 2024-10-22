import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { MejaWithTransaksiCount } from "../../../../types/meja";
export const getAllMeja = async () =>
	await prisma.meja.findMany({
		where: {
			isDeleted: false,
		},
	});

export const findAllMeja = async (where: Prisma.MejaWhereInput) =>
	(await prisma.meja.findMany({
		where: {
			...where,
			isDeleted: where.isDeleted ? where.isDeleted : false,
		},
		include: {
			_count: {
				select: { Transaksi: true },
			},
		},
	})) as MejaWithTransaksiCount[];

export const findMeja = async (where: Prisma.MejaWhereUniqueInput) => {
	return await prisma.meja.findUnique({
		where: {
			...where,
			isDeleted: false,
		},
	});
};

export const createMeja = async (data: Prisma.MejaCreateInput) => {
	return await prisma.meja.create({ data });
};

export const updateMeja = async (
	where: Prisma.MejaWhereUniqueInput,
	data: Prisma.MejaUpdateInput
) => {
	return await prisma.meja.update({
		where,
		data,
	});
};

export const restoreMeja = async (where: Prisma.MejaWhereUniqueInput) => {
	return await prisma.meja.update({ where, data: { isDeleted: false } });
};
export const deleteMeja = async (where: Prisma.MejaWhereUniqueInput) => {
	return await prisma.meja.update({ where, data: { isDeleted: true } });
};

export const hardDeleteMeja = async (where: Prisma.MejaWhereUniqueInput) => {
	return await prisma.meja.delete({ where });
};
