import { getAllTransaksi } from "@/app/utils/database/transaksi.query";
import TransaksiManagepage from "./TransaksiManagePage";
import { TransaksiType } from "../../../types/transaksi";
import { Suspense } from "react";
import { nextGetServerSession } from "@/lib/next-auth";

export default async function ManageTransaction({
	searchParams,
}: {
	searchParams: { start?: string; end?: string };
}) {
	let completedTransaksi: TransaksiType[] = [];
	let uncompleteTransaksi: TransaksiType[] = [];
	const session = await nextGetServerSession();

	if (session && session.user) {
		completedTransaksi = await getAllTransaksi(
			session.user,
			"lunas",
			searchParams.start || undefined,
			searchParams.end || undefined
		);

		uncompleteTransaksi = await getAllTransaksi(
			session.user,
			"belum_bayar",
			searchParams.start || undefined,
			searchParams.end || undefined
		);
	}
	return (
		<Suspense fallback={<div className="min-h-screen bg-background" />}>
			<TransaksiManagepage
				uncompleteTransaksi={uncompleteTransaksi}
				completedTransaksi={completedTransaksi}
			/>
		</Suspense>
	);
}
