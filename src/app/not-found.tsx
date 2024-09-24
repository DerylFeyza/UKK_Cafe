import Link from "next/link";
import Image from "next/image";
import Image404 from "@/../public/assets/404.jpg";
export default function Custom404() {
	return (
		<div className="bg-background flex items-center justify-center min-h-screen text-center p-4">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-sm mx-auto">
				<div className="flex justify-center">
					<Image src={Image404} alt="404" width={200} height={200} />
				</div>
				<p className="text-secondary mt-2">Page Not Found</p>
				<p className="text-secondary mt-4">
					The page you’re looking for doesn’t exist.
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
