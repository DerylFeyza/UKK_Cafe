import Link from "next/link";
import Image from "next/image";
import Image403 from "@/../public/assets/403.png";
export default function Custom403() {
	return (
		<div className="bg-background flex items-center justify-center min-h-screen text-center p-4">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-sm mx-auto">
				<div className="flex justify-center">
					<Image src={Image403} alt="403" width={200} height={200} />
				</div>
				<p className="text-secondary mt-2">403 Unauthorized</p>
				<p className="text-secondary mt-4">
					You don’t have access to this page.
				</p>
				<div className="mt-6">
					<Link href="/" className="button-transition px-4 py-2 rounded-lg">
						Go Back Home
					</Link>
				</div>
			</div>
		</div>
	);
}
