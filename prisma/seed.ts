const { Role } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 3;

async function main() {
	// Hash the password
	const hashedPassword = await bcrypt.hash("123", saltRounds);

	// Create an initial user
	const user = await prisma.user.create({
		data: {
			nama_user: "deryl",
			role: Role.admin,
			username: "deryl",
			password: hashedPassword,
		},
	});

	console.log("Created initial user:", user);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
