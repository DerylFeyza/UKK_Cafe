"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
	ssr: false,
});

const BarChart = ({
	labels,
	dataCounts,
	mode,
}: {
	labels: string[];
	dataCounts: number[];
	mode?: string;
}) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label: mode === "transaksi" ? "Jumlah Transaksi" : "Pendapatan",
				data: dataCounts,
				backgroundColor: ["rgba(255, 144, 42, 1)"],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="flex justify-center items-center">
			<div style={{ width: "700px" }}>
				<Bar data={data} />
			</div>
		</div>
	);
};

export default BarChart;
