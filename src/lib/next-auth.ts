import { AuthOptions, getServerSession } from "next-auth";
import { findUser } from "@/app/utils/database/user.query";
import { compareHash } from "@/app/utils/bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { Role } from "@prisma/client";

declare module "next-auth" {
	interface Session {
		user?: {
			id_user: string;
			nama_user: string;
			role: Role;
			username: string;
		};
	}
}

export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "username",
					type: "text",
					placeholder: "deryl",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const user = await findUser({ username: credentials?.username });
					if (!user) {
						return null;
					}

					const comparePassword = await compareHash(
						credentials!.password!,
						user.password!
					);
					if (!comparePassword) return null;

					const payload = {
						id: user.id_user,
						username: user.username,
						nama_user: user.nama_user,
						role: user.role,
					};

					return payload;
				} catch (error) {
					console.error(error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			console.log(token);
			if (user?.username) {
				const userdb = await findUser({ username: user.username });
				if (!userdb) return token;
				token.sub = userdb.id_user;
				token.username = userdb.username;
				token.nama_user = userdb.nama_user;
				token.role = userdb.role;
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user && token.sub) {
				const userdb = await findUser({ id_user: token.sub });
				session.user.nama_user = userdb!.nama_user;
				session.user.username = userdb!.username;
				session.user.id_user = userdb!.id_user;
				session.user.role = userdb!.role;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};

export const nextGetServerSession = () => getServerSession(authOptions);
