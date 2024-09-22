import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Role } from "@prisma/client";

interface UserDataType {
	username: string;
	role: Role;
	nama_user: string;
}

export const getAllUser = async () => {
	return await prisma.user.findMany({
		orderBy: {
			createdAt: "asc",
		},
	});
};

export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
	return await prisma.user.findUnique({ where });
};

export const findAllUser = async (where: Prisma.UserWhereInput) => {
	return await prisma.user.findMany({
		where,
	});
};
export const findFilteredUser = async (where: UserDataType) => {
	return await prisma.user.findMany({
		// @ts-expect-error idkman
		where: {
			...(where.username
				? {
						OR: [
							where.username
								? { username: { contains: where.username } }
								: undefined,
							where.nama_user
								? { nama_user: { contains: where.nama_user } }
								: undefined,
						].filter(Boolean),
				  }
				: {}),
			role: where.role ? where.role : undefined,
		},
	});
};

export const createUser = async (data: Prisma.UserCreateInput) => {
	return await prisma.user.create({ data });
};

export const updateUser = async (
	where: Prisma.UserWhereUniqueInput,
	data: Prisma.UserUpdateInput
) => {
	return await prisma.user.update({
		where,
		data,
	});
};

export const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
	return await prisma.user.delete({ where });
};
