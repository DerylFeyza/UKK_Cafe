"use client";

import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";

interface dataSelect {
	value: string;
	label: string;
}

export default function ReactSelect({ data }: { data: dataSelect[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleChange = (selectedOption: dataSelect | null) => {
		const params = new URLSearchParams(searchParams.toString());

		if (selectedOption) {
			params.set("user", selectedOption.value);
		} else {
			params.delete("user");
		}

		router.push(`?${params.toString()}`);
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
