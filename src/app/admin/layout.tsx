import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin Panel",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}

export const revalidate = 900;
