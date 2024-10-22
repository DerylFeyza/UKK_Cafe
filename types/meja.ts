"use client";
import { Prisma } from "@prisma/client";

export type MejaWithTransaksiCount = Prisma.MejaGetPayload<{
	include: {
		_count: {
			select: { Transaksi: true };
		};
	};
}>;
