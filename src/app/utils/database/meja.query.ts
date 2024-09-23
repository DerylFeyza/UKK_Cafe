import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllMeja = async () =>
	await prisma.meja.findMany({
		where: {
			isDeleted: false,
		},
	});

export const findAllMeja = async (where: Prisma.MejaWhereInput) =>
	await prisma.meja.findMany({
		where: {
			...where,
			isDeleted: false,
		},
	});

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
export const deleteMeja = async (where: Prisma.MejaWhereUniqueInput) => {
	return await prisma.meja.update({ where, data: { isDeleted: true } });
};
