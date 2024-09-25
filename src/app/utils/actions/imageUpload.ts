import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";

export async function imageUploader(file: File) {
	const buffer: Buffer = Buffer.from(await file.arrayBuffer());
	try {
		const upload: UploadApiResponse | undefined = await new Promise(
			(resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{ upload_preset: "ukkcafe_menu" },
						(error, uploadResult) => {
							if (error) reject(error);
							return resolve(uploadResult);
						}
					)
					//@ts-expect-error hehe
					.end(buffer?.data ? buffer.data : buffer);
			}
		);

		if (!upload) return { success: false, message: "Terjadi kesalahan" };

		return { success: true, message: "Upload sukses", url: upload.secure_url };
	} catch (error) {
		return {
			success: false,
			message: "Terjadi kesalahan",
		};
	}
}

export async function handleImageDelete(filename: string) {
	try {
		//@ts-expect-error hehe
		const publicId = filename.split("/").pop().split(".")[0];
		const deleteResult = await cloudinary.uploader.destroy(publicId);

		if (deleteResult.result === "ok") {
			return { success: true, message: "Image deleted successfully." };
		} else {
			throw new Error("Failed to delete image.");
		}
	} catch (error) {
		return {
			success: false,
			message: "Terjadi kesalahan saat menghapus gambar",
		};
	}
}
