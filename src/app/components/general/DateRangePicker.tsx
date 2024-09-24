"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DateRangePicker() {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
			setEndDate(startDate);
		}
	}, [startDate, endDate]);

	useEffect(() => {
		if (startDate && endDate) {
			const query = new URLSearchParams({
				start: startDate,
				end: endDate,
			}).toString();
			router.push(`/kasir/manage/?${query}`);
		} else {
			router.push(`/kasir/manage/`);
		}
	}, [startDate, endDate, router]);

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newStartDate = e.target.value;
		setStartDate(newStartDate);
		if (endDate && new Date(endDate) < new Date(newStartDate)) {
			setEndDate(newStartDate);
		}
	};

	return (
		<div className="w-full max-w-5xl pb-4 rounded-lg items-center flex justify-end pr-4 flex-wrap">
			<div className="w-full flex sm:flex-row sm:items-end justify-between space-y-4 sm:space-y-0 sm:space-x-4">
				<div className="flex">
					{startDate && endDate && (
						<p className="mt-2 text-md text-secondary sm:ml-4">
							Selected range:{" "}
							<span className="font-medium pr-2">{startDate}</span> to{" "}
							<span className="font-medium pl-2">{endDate}</span>
						</p>
					)}
				</div>
				<div className="flex space-x-4">
					<div className="flex-1">
						<label
							htmlFor="start-date"
							className="block text-sm font-medium text-secondary mb-1"
						>
							Start Date
						</label>
						<input
							type="date"
							id="start-date"
							value={startDate}
							onChange={handleStartDateChange}
							className="w-full px-3 py-2 bg-tertiary border-2 border-primary text-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
						/>
					</div>
					<div className="flex-1">
						<label
							htmlFor="end-date"
							className="block text-sm font-medium text-secondary mb-1"
						>
							End Date
						</label>
						<input
							type="date"
							id="end-date"
							value={endDate}
							min={startDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="w-full px-3 py-2 bg-tertiary border-2 border-primary text-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
