"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const { data: session } = useSession(); // Get session info
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			username,
			password,
			redirect: true,
		});

		if (result?.error) {
			setError("Invalid username or password");
		} else {
			router.push("/"); // Redirect to dashboard or desired page
		}
	};

	if (session?.user?.username) {
		return (
			<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Welcome, {session.user.username}!
				</h2>
				<button
					onClick={() => router.push("/")}
					className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
				>
					Go to Dashboard
				</button>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
		>
			<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

			{error && (
				<div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
			)}

			<div className="mb-4">
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>

			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
			>
				Login
			</button>
		</form>
	);
}
