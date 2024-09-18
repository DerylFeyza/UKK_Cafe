import { compare, hash } from "bcrypt";

const BCRYPT_ROUNDS = 17;

export const encrypt = async (plainText: string) => {
	const hashed = await hash(plainText, BCRYPT_ROUNDS);
	return hashed;
};

export const compareHash = async (plainText: string, cipherText: string) => {
	const comparation = await compare(plainText, cipherText);
	return comparation;
};
