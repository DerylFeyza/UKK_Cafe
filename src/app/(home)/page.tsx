import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import Coffee from "@/../public/assets/coffee.jpg";
import Image from "next/image";
export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<div className="flex min-h-screen bg-background">
			<div className="flex flex-col justify-center w-3/5 p-12 md:p-24 lg:p-36">
				<h1 className="text-5xl font-bold mb-4">
					Welcome!
					<br />
					<div className="pt-4">
						{session ? (
							<div className="flex flex-wrap items-center">
								<span className="text-primary pr-3">
									{session.user!.role.charAt(0).toUpperCase() +
										session.user!.role.slice(1)}
								</span>
								<span className="text-secondary">
									{session.user?.nama_user}
								</span>
							</div>
						) : (
							<span className="text-gray-500">You Are Not Logged In</span>
						)}
					</div>
				</h1>
				<p className="text-lg mb-8 text-gray-600">
					dont u love living paycheck to paycheck!
				</p>
			</div>
			<div className="relative w-2/5">
				<div className="mt-28 absolute inset-0 bg-secondary rounded-l-full rounded-tr-full"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<Image
						width={300}
						height={300}
						src={Coffee}
						className="rounded-full"
						alt="coffee"
					/>
				</div>
			</div>
		</div>
	);
}
