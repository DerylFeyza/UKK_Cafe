import { z } from "zod";

export const MejaFormSchema = z.object({
	nomor_meja: z
		.string()
		.min(1, { message: "Nomor Meja harus diisi!" })
		.max(4, { message: "Nomor Meja maximal 3 karakter!" }),
});
