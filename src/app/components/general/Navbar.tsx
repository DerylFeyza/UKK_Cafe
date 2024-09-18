"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SkeletonLoader from "../SkeletonLoader";
import Logo from "@/../public/logo/logo.png";
import Image from "next/image";

export default function Navbar() {
	const { data: session, status } = useSession();
	const loading = status === "loading";

	return (
		<nav className="bg-background fixed top-0 left-0 w-full">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<a href="/" className="flex items-center text-lg font-semibold">
							<Image
								src={Logo}
								alt="Logo"
								className="lg:w-[40px] w-[30px] mr-2"
							/>
							<span className="text-primary unselectable">Coffee</span>
							<span className="text-secondary unselectable"> Sek</span>
						</a>
					</div>
					<div className="flex items-center">
						{loading ? (
							<SkeletonLoader />
						) : session ? (
							<button
								onClick={() => signOut()}
								className="font-semibold text-lg text-secondary hover:text-primary transition duration-300 unselectable"
							>
								Log Out
							</button>
						) : (
							<Link
								href="/login"
								className="font-semibold text-lg text-secondary hover:text-primary transition duration-300 "
							>
								<button className="unselectable">Login</button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
