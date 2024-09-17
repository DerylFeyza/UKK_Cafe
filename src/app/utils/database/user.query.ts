import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllUser = async () => {
	return await prisma.user.findMany({});
};

export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
	return await prisma.user.findUnique({ where });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
	console.log(data);
	return await prisma.user.create({ data });
};
