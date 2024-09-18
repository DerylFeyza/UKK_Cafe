import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen bg-background">
			<div className="flex flex-col justify-center w-3/5 p-12">
				<h1 className="text-5xl font-bold mb-4">
					Enjoy your <span className="text-[#ff9900]">coffee</span>
					<br />
					before your activity
				</h1>
				<p className="text-lg mb-8 text-gray-600">
					Boost your productivity and build your
					<br />
					mood with a glass of coffee in the morning
				</p>
				<div className="flex items-center space-x-4">
					<button className="bg-[#3c2f2f] text-white px-6 py-3 rounded-full flex items-center">
						Order now
						<span className="ml-2 bg-[#ff9900] rounded-full p-1">→</span>
					</button>
					<a href="#" className="text-[#ff9900] font-semibold">
						More menu
					</a>
				</div>
			</div>
			<div className="relative w-2/5">
				<div className="absolute inset-0 bg-secondary rounded-l-full"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<Image
						src="/placeholder.svg?height=300&width=300"
						width={300}
						height={300}
						alt="Cappuccino"
						className="rounded-full"
					/>
				</div>
			</div>
		</div>
	);
}
