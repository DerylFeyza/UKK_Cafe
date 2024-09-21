import AddUserForm from "./components/AddUserForm";
import FilterLayout from "./components/FilterLayout";
import { getAllUser, findFilteredUser } from "@/app/utils/database/user.query";
import UserCard from "./components/UserCard";
import { User } from "@prisma/client";
import { Role } from "@prisma/client";
import { Suspense } from "react";
export default async function Users({
	searchParams,
}: {
	searchParams: { keyword: string; role: string };
}) {
	let users: User[];
	if (searchParams.keyword || searchParams.role) {
		users = await findFilteredUser({
			username: searchParams.keyword,
			nama_user: searchParams.keyword,
			role: searchParams.role as Role,
		});
	} else {
		users = await getAllUser();
	}
	return (
		<div className="min-h-screen bg-background p-8 pt-24">
			<div className="max-w-8xl mx-auto flex">
				<div className="w-[70%]">
					<div className="flex flex-wrap max-h-[82vh] overflow-y-auto mr-24 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24">
						<Suspense fallback={<div>Loading...</div>}>
							<FilterLayout searchData={searchParams} />
						</Suspense>

						{users &&
							users.map((user) => (
								<div className="pb-4 pr-4" key={user.id_user}>
									<UserCard userData={user} />
								</div>
							))}
					</div>
				</div>

				<div className="w-[30%]">
					<AddUserForm />
				</div>
			</div>
		</div>
	);
}