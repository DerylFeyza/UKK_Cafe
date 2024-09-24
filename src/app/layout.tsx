import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "./components/NextAuthProvider";
import ToastProvider from "@/lib/ToastProvider";
import Providers from "@/redux/Provider";
import { store } from "../redux/store";
import Navbar from "./components/general/Navbar";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
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
