import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllMenu = async () => {
	return await prisma.menu.findMany({});
};

export const findMenu = async (where: Prisma.MenuWhereUniqueInput) => {
	return await prisma.menu.findUnique({ where });
};

export const createMenu = async (data: Prisma.MenuCreateInput) => {
	return await prisma.menu.create({ data });
};

export const updateMenu = async (
	where: Prisma.MenuWhereUniqueInput,
	data: Prisma.MenuUpdateInput
) => {
	return await prisma.menu.update({
		where,
		data,
	});
};

export const deleteMenu = async (where: Prisma.MenuWhereUniqueInput) => {
	return await prisma.menu.delete({ where });
};
