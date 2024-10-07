"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SkeletonLoader from "../SkeletonLoader";
import { usePathname } from "next/navigation";
import Logo from "@/../public/logo/logo.png";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing lucide-react icons

export default function Navbar() {
	const { data: session, status } = useSession();
	const loading = status === "loading";
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

	const toggleMenu = () => setMenuOpen(!menuOpen); // Function to toggle menu

	if (pathname === "/login") {
		return null;
	}

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
					<div className="hidden lg:flex items-center space-x-10">
						{/* Desktop nav options */}
						{session ? (
							session.user?.role === "admin" ? (
								<>
									<Link href="/admin/users" className="link-button">
										<button className="unselectable">Users</button>
									</Link>
									<Link href="/admin/menus" className="link-button">
										<button className="unselectable">Menus</button>
									</Link>
									<Link href="/admin/mejas" className="link-button">
										<button className="unselectable">Mejas</button>
									</Link>
									<Link href="/transaksi" className="link-button">
										<button className="unselectable">Transactions</button>
									</Link>
									<Link href="/transaksi/dashboard" className="link-button">
										<button className="unselectable">
											Transaction Dashboard
										</button>
									</Link>
								</>
							) : session.user?.role === "kasir" ? (
								<>
									<Link href="/kasir/transactions" className="link-button">
										<button className="unselectable">Create Transaction</button>
									</Link>
									<Link href="/transaksi" className="link-button">
										<button className="unselectable">Manage Transaction</button>
									</Link>
									<Link href="/transaksi/dashboard" className="link-button">
										<button className="unselectable">
											Transaction Dashboard
										</button>
									</Link>
								</>
							) : session.user?.role === "manajer" ? (
								<>
									<Link href="/manajer/menus" className="link-button">
										<button className="unselectable">Manage Menu</button>
									</Link>
									<Link href="/transaksi" className="link-button">
										<button className="unselectable">Manage Transaction</button>
									</Link>
									<Link href="/transaksi/dashboard" className="link-button">
										<button className="unselectable">
											Transaction Dashboard
										</button>
									</Link>
								</>
							) : null
						) : null}
					</div>
					<div className="lg:hidden flex items-center justify-end">
						{/* Hamburger icon for smaller screens */}
						<button
							onClick={toggleMenu}
							className="focus:outline-none text-secondary"
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
					<div className="hidden lg:flex items-center">
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
			{/* Dropdown for smaller screens */}
			{menuOpen && (
				<div className="lg:hidden bg-background absolute top-16 left-0 w-full z-50">
					<div className="flex flex-col items-center space-y-4 py-4">
						{session ? (
							session.user?.role === "admin" ? (
								<>
									<Link href="/admin/users" className="link-button">
										<button className="unselectable">Users</button>
									</Link>
									<Link href="/admin/menus" className="link-button">
										<button className="unselectable">Menus</button>
									</Link>
									<Link href="/admin/mejas" className="link-button">
										<button className="unselectable">Mejas</button>
									</Link>
									<Link href="/transaksi" className="link-button">
										<button className="unselectable">Transactions</button>
									</Link>
									<Link href="/transaksi/dashboard" className="link-button">
										<button className="unselectable">
											Transaction Dashboard
										</button>
									</Link>
								</>
							) : session.user?.role === "kasir" ? (
								<>
									<Link href="/kasir/transactions" className="link-button">
										<button className="unselectable">Create Transaction</button>
									</Link>
									<Link href="/transaksi" className="link-button">
										<button className="unselectable">Manage Transaction</button>
									</Link>
									<Link href="/transaksi/dashboard" className="link-button">
										<button className="unselectable">
											Transaction Dashboard
										</button>
									</Link>
								</>
							) : session.user?.role === "manajer" ? (
								<>
									<Link href="/manajer/menus" className="link-button">
										<button className="unselectable">Manage Menu</button>
									</Link>
									<Link href="/transaksi" className="link-button">
										<button className="unselectable">Manage Transaction</button>
									</Link>
									<Link href="/transaksi/dashboard" className="link-button">
										<button className="unselectable">
											Transaction Dashboard
										</button>
									</Link>
								</>
							) : null
						) : null}
						<>
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
						</>
					</div>
				</div>
			)}
		</nav>
	);
}
