import BarChart from "./components/Chart";
import {
	countTransaksiByDate,
	SumTransaksiByDate,
	countAllTransaksi,
	sumAllTransaksi,
} from "@/app/utils/database/transaksi.query";
import DateRangePicker from "@/app/components/general/DateRangePicker";
import { nextGetServerSession } from "@/lib/next-auth";
import { TransaksiCount } from "../../../../types/transaksi";
import ChartLayout from "./components/ChartLayout";
export default async function TransactionDashboard({
	searchParams,
}: {
	searchParams: { mode?: string; start?: string; end?: string };
}) {
	const session = await nextGetServerSession();
	let labels: string[] = [];
	let dataCounts: number[] = [];
	let allTransaksiCount: number = 0;
	let allTransaksiSum: number = 0;
	let dataTransaksi: TransaksiCount[] = [];
	if (session && session.user) {
		if (searchParams.mode == "transaksi") {
			dataTransaksi = await countTransaksiByDate(
				session.user,
				searchParams.start || undefined,
				searchParams.end || undefined
			);
			dataCounts = dataTransaksi.map((item) => Number(item.transaksi_count));
		}

		if (searchParams.mode == "pendapatan") {
			dataTransaksi = await SumTransaksiByDate(
				session.user,
				searchParams.start || undefined,
				searchParams.end || undefined
			);
			dataCounts = dataTransaksi.map((item) =>
				Number(item.transaksi_penghasilan)
			);
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
		allTransaksiSum = await sumAllTransaksi(session.user);
	}

	return (
		<div className="max-h-screen min-h-screen bg-background p-8 pt-24">
			<div className="max-w-8xl flex flex-col lg:flex-row lg:flex-wrap">
				<div className="lg:w-3/5 w-full lg:pr-4">
					<div className="max-w-[90%] mb-12">
						<DateRangePicker />
					</div>
					<div>
						<BarChart
							labels={labels}
							dataCounts={dataCounts}
							mode={searchParams.mode}
						/>
					</div>
					<div className="w-full flex justify-center pt-8">
						<ChartLayout mode={searchParams.mode} />
					</div>
				</div>
				<div className="lg:w-2/5 w-full flex justify-center flex-wrap mt-8">
					<div className="relative space-y-10 mb-4 lg:pl-20">
						<div className="w-96 h-60 flex flex-col items-center justify-center rounded-full text-2xl font-bold text-secondary bg-white shadow-lg">
							<span className="w-full text-center">
								{new Intl.NumberFormat("id-ID").format(allTransaksiCount)}
							</span>
							<span className="text-center">Transaksi Berhasil</span>
						</div>
						<div className="w-96 h-60 flex flex-col items-center justify-center rounded-full text-2xl font-bold text-secondary bg-white shadow-lg">
							<span className="w-full text-center">
								{new Intl.NumberFormat("id-ID").format(allTransaksiSum)}
							</span>
							<span className="text-center">Total Penghasilan</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
