/* eslint-disable @typescript-eslint/no-unused-vars */
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
		id: string;
		role: string;
		nama_user: string;
		username: string;
	}
}
