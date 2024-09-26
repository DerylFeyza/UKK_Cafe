import { z } from "zod";
import { Jenis } from "@prisma/client";
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5_000_000;

export const createMenuSchema = z.object({
	nama_menu: z
		.string()
		.min(1, { message: "Nama harus diisi!" })
		.max(100, { message: "Nama maksimal 100 karakter!" }),
	jenis: z.nativeEnum(Jenis),
	deskripsi: z.string().optional(),
	gambar: z
		.instanceof(File)
		.refine((file: File) => {
			return ACCEPTED_IMAGE_TYPES.includes(file?.type);
		}, "File harus menggunakan ekstensi .jpeg, .png.")
		.refine((file: File) => {
			return file?.size <= MAX_FILE_SIZE;
		}, `Ukuran maksimal file adalah 5MB`),
	harga: z.number().min(1, { message: "Harga harus diisi!" }),
});

export const updateMenuSchema = z.object({
	nama_menu: z
		.string()
		.min(1, { message: "Nama harus diisi!" })
		.max(100, { message: "Nama maksimal 100 karakter!" }),
	jenis: z.nativeEnum(Jenis),
	deskripsi: z.string().optional(),
	gambar: z
		.instanceof(File)
		.refine((file: File) => {
			return ACCEPTED_IMAGE_TYPES.includes(file?.type);
		}, "File harus menggunakan ekstensi .jpeg, .png.")
		.refine((file: File) => {
			return file?.size <= MAX_FILE_SIZE;
		}, `Ukuran maksimal file adalah 5MB`)
		.optional(),
	harga: z.number().min(1, { message: "Harga harus diisi!" }),
});
