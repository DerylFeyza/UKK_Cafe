import AddUserForm from "./components/AddUserForm";
import FilterLayout from "./components/FilterLayout";
import { getAllUser } from "@/app/utils/database/user.query";
import UserCard from "./components/UserCard";
export default async function Users() {
	const users = await getAllUser();
	return (
		<div className="min-h-screen bg-background p-8 pt-24">
			<div className="max-w-8xl mx-auto flex">
				<div className="w-[70%] ">
					<div className="flex flex-wrap max-h-[82vh] overflow-y-auto mr-24 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24">
						<FilterLayout />
						{users &&
							users.map((user, index) => (
								<div className="pb-4 pr-4" key={index}>
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
