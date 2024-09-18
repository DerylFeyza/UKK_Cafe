import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#FF902A",
				secondary: "#2F2105",
				tertiary: "#F9D9AA",
				background: "#F6EBDA",
			},
		},
	},
	plugins: [],
};

export default config;
