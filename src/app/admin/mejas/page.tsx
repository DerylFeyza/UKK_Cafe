import { getAllMeja } from "@/app/utils/database/meja.query";
import MejaCard from "./components/MejaCard";
import AddMejaForm from "./components/AddMejaForm";
export default async function Users() {
	const mejas = await getAllMeja();
	return (
		<div className="min-h-screen bg-background p-8 pt-24">
			<div className="max-w-8xl mx-auto flex">
				<div className="w-[70%]">
					<span className="font-bold text-2xl  text-secondary">List Meja</span>
					<div className="mt-6 flex flex-wrap max-h-[82vh] overflow-y-auto mr-24 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24">
						{mejas &&
							mejas.map((meja) => (
								<div className="pb-4 pr-4" key={meja.id_meja}>
									<MejaCard mejaData={meja} />
								</div>
							))}
					</div>
				</div>

				<div className="w-[30%]">
					<AddMejaForm />
				</div>
			</div>
		</div>
	);
}
