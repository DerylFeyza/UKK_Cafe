"use client";
import { Prisma } from "@prisma/client";

export type UserWithTransaksiCount = Prisma.UserGetPayload<{
	include: {
		_count: {
			select: { Transaksi: true };
		};
	};
}>;

export type UserSelect = {
	id_user: string;
	username: string;
	nama_user: string;
};
