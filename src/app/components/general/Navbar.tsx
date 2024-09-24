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
		<nav className="bg-background fixed top-0 left-0 w-full z-50">
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
						{session ? (
							session.user?.role === "admin" ? (
								<div className="flex space-x-10">
									<Link href="/admin/users" className="link-button">
										<button className="unselectable">Users</button>
									</Link>
									<Link href="/admin/menus" className="link-button">
										<button className="unselectable">Menus</button>
									</Link>
									<Link href="/admin/mejas" className="link-button">
										<button className="unselectable">Mejas</button>
									</Link>
								</div>
							) : session.user?.role === "kasir" ? (
								<div className="flex space-x-10">
									<Link href="/kasir/transactions" className="link-button">
										<button className="unselectable">Create Transaction</button>
									</Link>
									<Link href="/kasir/manage" className="link-button">
										<button className="unselectable">Manage Transaction</button>
									</Link>
								</div>
							) : session.user?.role === "manajer" ? (
								<Link href="/manajer/menus" className="link-button">
									<button className="unselectable">Manage Menu</button>
								</Link>
							) : null
						) : null}
					</div>
					<div className="flex items-center">
						{loading ? (
							<SkeletonLoader />
						) : session ? (
							<button
								onClick={() => signOut()}
								className="link-button unselectable"
							>
								Log Out
							</button>
						) : (
							<Link href="/login" className="link-button ">
								<button className="unselectable">Login</button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
