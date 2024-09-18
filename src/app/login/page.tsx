"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
export default function LoginForm() {
	const { status } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	if (status === "authenticated") return redirect("/");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const result = await signIn("credentials", {
				username,
				password,
				redirect: true,
				callbackUrl,
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
