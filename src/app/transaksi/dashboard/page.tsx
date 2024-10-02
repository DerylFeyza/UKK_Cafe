import BarChart from "./components/Chart";
import {
	countTransaksiByDate,
	SumTransaksiByDate,
	countAllTransaksi,
	countAllUncompleteTransaksi,
	sumAllTransaksi,
} from "@/app/utils/database/transaksi.query";
import { getAllKasir } from "@/app/utils/database/user.query";
import DateRangePicker from "@/app/components/general/DateRangePicker";
import ReactSelect from "@/app/components/general/ReactSelect";
import ClearFilterButton from "./components/ClearFilterButton";
import { nextGetServerSession } from "@/lib/next-auth";
import { TransaksiCount } from "../../../../types/transaksi";
import ChartLayout from "./components/ChartLayout";
import { UserSelect } from "../../../../types/user";
import { Suspense } from "react";

export default async function TransactionDashboard({
	searchParams,
}: {
	searchParams: { mode?: string; start?: string; end?: string; user?: string };
}) {
	const session = await nextGetServerSession();
	let labels: string[] = [];
	let dataCounts: number[] = [];
	let allTransaksiCount: number = 0;
	let allUncompleteTransaksiCount: number = 0;
	let allTransaksiSum: number = 0;
	let dataTransaksi: TransaksiCount[] = [];
	let dataKasir: UserSelect[] = [];
	if (session && session.user) {
		if (searchParams.mode == "pendapatan") {
			dataTransaksi = await SumTransaksiByDate(
				session.user,
				searchParams.start || undefined,
				searchParams.end || undefined,
				searchParams.user || undefined
			);
			dataCounts = dataTransaksi.map((item) =>
				Number(item.transaksi_penghasilan)
			);
		} else {
			dataTransaksi = await countTransaksiByDate(
				session.user,
				searchParams.start || undefined,
				searchParams.end || undefined,
				searchParams.user || undefined
			);
			dataCounts = dataTransaksi.map((item) => Number(item.transaksi_count));
		}

		labels = dataTransaksi.map((item) => {
			const date = new Date(item.transaksi_date);
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		});
		allTransaksiCount = await countAllTransaksi(session.user);
		allUncompleteTransaksiCount = await countAllUncompleteTransaksi(
			session.user
		);
		allTransaksiSum = await sumAllTransaksi(session.user);
		dataKasir = await getAllKasir();
	}

	const transformedUsers = dataKasir.map((user) => ({
		value: user.id_user,
		label: user.username + " - " + user.nama_user,
	}));

	return (
		<div className="max-h-screen min-h-screen bg-background p-8 pt-20">
			<div className="max-w-8xl flex flex-col lg:flex-row lg:flex-wrap">
				<div className="lg:w-3/5 w-full lg:pr-4">
					<div className="max-w-[90%] mb-4 flex flex-wrap justify-between pl-20 ">
						<div className="flex justify-between w-full items-end space-x-2 pb-4 h-20">
							<ClearFilterButton />
							<DateRangePicker />
						</div>
						{session?.user?.role !== "kasir" && (
							<ReactSelect data={transformedUsers} />
						)}
					</div>
					<div>
						<Suspense fallback={<div>Loading...</div>}>
							<BarChart
								labels={labels}
								dataCounts={dataCounts}
								mode={searchParams.mode}
							/>
						</Suspense>
					</div>
					<div className="w-full flex justify-center pt-8">
						<ChartLayout mode={searchParams.mode} />
					</div>
				</div>
				<div className="lg:w-2/5 w-full flex justify-center flex-wrap mt-8">
					<div className="relative space-y-10 mb-4 lg:pl-20">
						<div className="w-96 h-60 flex flex-col items-center justify-center rounded-full text-2xl font-bold text-secondary bg-white shadow-lg">
							<span className="w-full text-center">
								{new Intl.NumberFormat("id-ID").format(
									allUncompleteTransaksiCount
								)}
							</span>
							<span className="text-center">Transaksi Belum Dibayar</span>
							<span className="w-full text-center pt-8">
								{new Intl.NumberFormat("id-ID").format(allTransaksiCount)}
							</span>
							<span className="text-center">Transaksi Berhasil</span>
						</div>
						<div className="w-96 h-60 flex flex-col items-center justify-center rounded-full text-2xl font-bold text-secondary bg-white shadow-lg">
							<span className="w-full text-center">
								Rp. {new Intl.NumberFormat("id-ID").format(allTransaksiSum)}
							</span>
							<span className="text-center">Total Penghasilan</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
