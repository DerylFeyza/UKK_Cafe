import path from "path";
import { writeFile, unlink } from "fs/promises";

const allowedFileTypes = ["image/jpeg", "image/png"];

export const handleImageUpload = async (file: File): Promise<string> => {
	if (!file) {
		throw new Error("No file provided.");
	}
	if (!allowedFileTypes.includes(file.type)) {
		throw new Error("Unsupported file type. Allowed types are: JPEG, PNG");
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const fileExtension = file.type.split("/")[1];
	const filename = "menu-" + Date.now() + "." + fileExtension;
	await writeFile(path.join(process.cwd(), "public/menu/" + filename), buffer);
	return filename;
};

export const handleImageDelete = async (filename: string): Promise<void> => {
	const filePath = path.join(process.cwd(), "public/uploads/", filename);
	await unlink(filePath);
};
