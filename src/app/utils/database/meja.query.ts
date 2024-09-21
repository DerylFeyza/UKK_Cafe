import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllMeja = async () => await prisma.meja.findMany({});

export const findMeja = async (where: Prisma.MejaWhereUniqueInput) => {
	return await prisma.meja.findUnique({ where });
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
	return await prisma.meja.delete({ where });
};
