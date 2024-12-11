import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Ngopi Sek",
		short_name: "Ngopi Sek",
		description: "A Cafe Web App built with Next.js",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: "/logo/logo.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/logo/logo.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
