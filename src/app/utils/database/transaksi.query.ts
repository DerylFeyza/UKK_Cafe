import prisma from "@/lib/prisma";
import { Prisma, Status } from "@prisma/client";
import { TransaksiType, TransaksiCount } from "../../../../types/transaksi";
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	baseQuery: any,
	startDate?: string,
	endDate?: string
) => {
	if (startDate) {
		const start = new Date(startDate);
		let end: Date;

		if (endDate && startDate !== endDate) {
			end = new Date(endDate);
			end.setDate(end.getDate() + 1);
		} else {
			end = new Date(startDate);
			end.setDate(start.getDate() + 1);
		}

		baseQuery.where.AND = [
			...(baseQuery.where.AND || []),
			{
				tgl_transaksi: {
					gte: start,
					lt: end,
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

export const countTransaksiByDate = async (
	session: Session,
	startDate?: string,
	endDate?: string,
	user?: string
): Promise<TransaksiCount[]> => {
	const today = new Date();
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(today.getDate() - 7);

	const finalStartDate = startDate || sevenDaysAgo.toISOString().split("T")[0];
	const finalEndDate = endDate || today.toISOString().split("T")[0];

	let result;

	if (session.role === "kasir") {
		result = await prisma.$queryRaw`
		SELECT 
		  DATE(tgl_transaksi) AS transaksi_date, 
		  COUNT(id_transaksi) AS transaksi_count 
		FROM 
		  "Transaksi" 
		WHERE 
		  DATE(tgl_transaksi) >= CAST(${finalStartDate} AS DATE) 
		  AND DATE(tgl_transaksi) <= CAST(${finalEndDate} AS DATE)
		  AND status != 'belum_bayar'
		  AND id_user = ${session.id_user}
		GROUP BY 
		  DATE(tgl_transaksi) 
		ORDER BY 
		  transaksi_date ASC;
	  `;
	} else {
		result = await prisma.$queryRaw`
		SELECT 
		  DATE(tgl_transaksi) AS transaksi_date, 
		  COUNT(id_transaksi) AS transaksi_count 
		FROM 
		  "Transaksi" 
		WHERE 
		  DATE(tgl_transaksi) >= CAST(${finalStartDate} AS DATE) 
		  AND DATE(tgl_transaksi) <= CAST(${finalEndDate} AS DATE)
		  AND status != 'belum_bayar'
		  ${user ? Prisma.sql`AND id_user = ${user}` : Prisma.empty}
		GROUP BY 
		  DATE(tgl_transaksi) 
		ORDER BY 
		  transaksi_date ASC;
	  `;
	}

	return result as TransaksiCount[];
};

export const SumTransaksiByDate = async (
	session: Session,
	startDate?: string,
	endDate?: string,
	user?: string
): Promise<TransaksiCount[]> => {
	const today = new Date();
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(today.getDate() - 7);

	const finalStartDate = startDate || sevenDaysAgo.toISOString().split("T")[0];
	const finalEndDate = endDate || today.toISOString().split("T")[0];

	let result;

	if (session.role === "kasir") {
		result = await prisma.$queryRaw`
		SELECT 
		  DATE(tgl_transaksi) AS transaksi_date, 
		  SUM(total) AS transaksi_penghasilan 
		FROM 
		  "Transaksi" 
		WHERE 
		  DATE(tgl_transaksi) >= CAST(${finalStartDate} AS DATE) 
		  AND DATE(tgl_transaksi) <= CAST(${finalEndDate} AS DATE)
		  AND status != 'belum_bayar'
		  AND id_user = ${session.id_user}
		GROUP BY 
		  DATE(tgl_transaksi) 
		ORDER BY 
		  transaksi_date ASC;
	  `;
	} else {
		result = await prisma.$queryRaw`
		SELECT 
		  DATE(tgl_transaksi) AS transaksi_date, 
		  SUM(total) AS transaksi_penghasilan 
		FROM 
		  "Transaksi" 
		WHERE 
		  DATE(tgl_transaksi) >= CAST(${finalStartDate} AS DATE) 
		  AND DATE(tgl_transaksi) <= CAST(${finalEndDate} AS DATE)
		  AND status != 'belum_bayar'
		  ${user ? Prisma.sql`AND id_user = ${user}` : Prisma.empty}
		GROUP BY 
		  DATE(tgl_transaksi) 
		ORDER BY 
		  transaksi_date ASC;
	  `;
	}

	return result as TransaksiCount[];
};

export const sumAllTransaksi = async (session: Session) => {
	const result = await prisma.transaksi.aggregate({
		where: {
			...(session.role === "kasir" ? { id_user: session.id_user } : {}),
			status: "lunas",
		},
		_sum: {
			total: true,
		},
	});
	return result._sum.total || 0;
};

export const countAllTransaksi = async (session: Session) => {
	return await prisma.transaksi.count({
		where: {
			...(session.role === "kasir" ? { id_user: session.id_user } : {}),
			status: "lunas",
		},
	});
};

export const completeTransaction = async (
	where: Prisma.TransaksiWhereUniqueInput
) => {
	await prisma.transaksi.update({ where, data: { status: "lunas" } });
};
