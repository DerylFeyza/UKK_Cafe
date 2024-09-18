"use client";

import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const { data: session } = useSession();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const result = await signIn("credentials", {
				username,
				password,
				redirect: false,
			});

			if (!result?.error) {
				router.push("/");
			} else {
				setErrorMessage("Incorrect Email or Password");
			}
		} catch (error) {
			setErrorMessage("Error logging in: " + (error as Error).message);
		}
	};

	if (session?.user?.username) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-tertiary to-background">
				<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
					<h2 className="text-2xl font-bold mb-6 text-center text-secondary">
						Welcome, {session?.user?.username}!
					</h2>
					<button
						onClick={() => router.push("/")}
						className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-secondary hover:text-white focus:outline-none mb-4 transition duration-300 ease-in-out"
					>
						Go to Dashboard
					</button>
					<button
						onClick={() => signOut()}
						className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-secondary hover:text-white focus:outline-none transition duration-300 ease-in-out"
					>
						Log Out
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-tertiary to-background">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
			>
				<h1 className="text-3xl font-bold text-secondary mb-6 text-center">
					Login
				</h1>

				{errorMessage && (
					<div className="mb-4 p-3 bg-tertiary text-secondary border border-primary rounded">
						{errorMessage}
					</div>
				)}

				<div className="mb-6">
					<label
						htmlFor="Username"
						className="block text-sm font-medium text-secondary mb-2 pl-1"
					>
						Username
					</label>
					<input
						type="Username"
						id="Username"
						name="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your Username"
						className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
						required
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-secondary mb-2 pl-1"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						className="w-full p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary hover:text-white transition duration-300 ease-in-out"
				>
					Login
				</button>
			</form>
		</div>
	);
}
