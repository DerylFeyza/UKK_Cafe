import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "./components/NextAuthProvider";
import ToastProvider from "@/lib/ToastProvider";
import Providers from "@/redux/Provider";
import { store } from "../redux/store";
import Navbar from "./components/general/Navbar";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: {
		default: "Ngopi Sek",
		template: "%s | Coffee Sek",
	},
	description: "Wikusama Cafe",
	authors: { name: "DerylFeyza", url: "https://github.com/DerylFeyza" },
	creator: "Deryl Feyza",
	publisher: "Deryl Feyza",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// @ts-expect-error can i live
		<Providers store={store}>
			<html lang="en">
				<body className={poppins.className}>
					<NextAuthProvider>
						<Navbar />
						<ToastProvider>{children}</ToastProvider>
					</NextAuthProvider>
				</body>
			</html>
		</Providers>
	);
}
