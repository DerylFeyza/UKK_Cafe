import { z } from "zod";
import { Role } from "@prisma/client";

export const updateUserSchema = z.object({
	nama_user: z.string().min(1, { message: "nama user tidak boleh kosong!" }),
	username: z
		.string()
		.min(1, { message: "Username minimal 1 karakter!" })
		.max(70, { message: "Username maksimal 70 karakter!" }),
	role: z.nativeEnum(Role),
	password: z
		.string()
		.min(7, { message: "Password minimal 7 karakter!" })
		.optional(),
});

export const createUserSchema = z.object({
	nama_user: z.string().min(1, { message: "nama user tidak boleh kosong!" }),
	username: z
		.string()
		.min(1, { message: "Username harus diisi!" })
		.max(70, { message: "Username maksimal 70 karakter!" }),
	role: z.nativeEnum(Role),
	password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
});
