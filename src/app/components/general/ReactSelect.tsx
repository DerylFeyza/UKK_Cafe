"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";

interface dataSelect {
	value: string;
	label: string;
}

export default function ReactSelect({ data }: { data: dataSelect[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedOption, setSelectedOption] = useState<dataSelect | null>(null);

	useEffect(() => {
		const userParam = searchParams.get("user");
		const selected = data.find((option) => option.value === userParam) || null;
		setSelectedOption(selected);
	}, [searchParams, data]);

	const handleChange = (option: dataSelect | null) => {
		const params = new URLSearchParams(searchParams.toString());

		if (option) {
			params.set("user", option.value);
		} else {
			params.delete("user");
		}

		router.push(`?${params.toString()}`);
		setSelectedOption(option);
	};

	return (
		<div className="w-full">
			<Select
				className="basic-single"
				classNamePrefix="select"
				isDisabled={false}
				isLoading={false}
				isClearable={true}
				isRtl={false}
				isSearchable={true}
				name="user"
				options={data}
				onChange={handleChange}
				value={selectedOption}
			/>
			<div
				style={{
					color: "hsl(0, 0%, 40%)",
					display: "inline-block",
					fontSize: 12,
					fontStyle: "poppins",
					marginTop: "1em",
				}}
			></div>
		</div>
	);
}
