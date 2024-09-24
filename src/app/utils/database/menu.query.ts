import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllMenu = async () =>
	await prisma.menu.findMany({
		orderBy: {
			createdAt: "asc",
		},
		where: {
			isDeleted: false,
		},
	});

export const findMenu = async (where: Prisma.MenuWhereUniqueInput) => {
	return await prisma.menu.findUnique({
		where: {
			...where,
			isDeleted: false,
		},
	});
};

export const findAllMenu = async (where: Prisma.MenuWhereInput) => {
	return await prisma.menu.findMany({
		where: {
			...(where.nama_menu || where.deskripsi
				? {
						OR: [
							where.nama_menu
								? { nama_menu: { contains: where.nama_menu } }
								: undefined,
							where.deskripsi
								? { deskripsi: { contains: where.deskripsi } }
								: undefined,
						].filter(Boolean) as Prisma.MenuWhereInput[],
				  }
				: {}),
			jenis: where.jenis ? where.jenis : undefined,
			isDeleted: false,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
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
	return await prisma.menu.update({ where, data: { isDeleted: true } });
};
