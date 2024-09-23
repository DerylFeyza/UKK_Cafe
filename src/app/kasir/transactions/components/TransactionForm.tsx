"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearOrderList, updateOrderQuantity } from "@/redux/slices/orderSlice";
import SelectMejaModal from "./SelectMejaModal";
import { useSession } from "next-auth/react";
import { handleCreateTransaksi } from "@/app/utils/actions/transaksi";
export default function TransactionForm() {
	const { data: session } = useSession();
	const orderList = useSelector((state: RootState) => state.orderList);
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pelanggan, setPelanggan] = useState("");
	const [editItemId, setEditItemId] = useState<string | null>(null);
	const [quantity, setQuantity] = useState<number | string>("");
	const [statusBayar, setStatusBayar] = useState<string>("");

	let totalHarga: number = 0;
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "") {
			setQuantity("");
		} else if (!isNaN(Number(value)) && Number(value) >= 0) {
			setQuantity(Number(value));
		}
	};

	const handleBlur = (itemId: string) => {
		if (quantity !== "") {
			dispatch(
				updateOrderQuantity({ id_menu: itemId, quantity: Number(quantity) })
			);
		}
		setEditItemId(null);
	};

	const selectedMeja = useSelector(
		(state: RootState) => state.mejaList.selectedMeja
	);

	const handleSubmitTransaksi = async (e: React.FormEvent) => {
		e.preventDefault();

		if (selectedMeja && session?.user?.id_user) {
			const formData = new FormData();
			formData.append("id_meja", selectedMeja.id_meja);
			formData.append("nama_pelanggan", pelanggan);
			formData.append("id_user", session?.user?.id_user);
			formData.append("status", statusBayar);
			formData.append("total", totalHarga.toString());
			const orderDetails = orderList.map((order) => ({
				id_menu: order.id_menu,
				harga: order.harga,
				jumlah: order.quantity,
			}));

			await handleCreateTransaksi(formData, orderDetails);
			window.location.reload();
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-lg">
			<div className="p-8">
				<form className="space-y-6" onSubmit={handleSubmitTransaksi}>
					<div className="flex justify-between items-center mb-6 flex-wrap">
						<h2 className="text-2xl font-bold text-secondary">Add Transaksi</h2>
						<button
							type="button"
							onClick={() => dispatch(clearOrderList())}
							className="button-transition p-2 rounded-lg"
						>
							Clear
						</button>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="nama-menu"
							className="block text-sm font-medium text-secondary"
						>
							Nama Pelanggan
						</label>
						<input
							type="text"
							id="nama-menu"
							value={pelanggan}
							onChange={(e) => setPelanggan(e.target.value)}
							required
							className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
						/>
					</div>

					<div className="w-full flex justify-around items-center gap-4 ">
						<button
							className="w-2/5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium button-transition"
							onClick={() => setIsModalOpen(true)}
							type="button"
						>
							Select Meja
						</button>
						<span className="w-3/5 py-2 flex justify-center items-center bg-tertiary text-secondary border-tertiary rounded-md">
							{selectedMeja ? (
								<div className=" text-secondary">
									Meja {selectedMeja.nomor_meja}
								</div>
							) : (
								<div className=" text-secondary">Pilih Meja</div>
							)}
						</span>
					</div>

					<div className="max-h-[250px]  overflow-y-auto pr-2 space-y-6 pb-6">
						{orderList.map((item) => {
							const itemTotal = item.quantity * item.harga;
							totalHarga += itemTotal;
							return (
								<div key={item.id_menu} className="flex flex-nowrap">
									<span className="w-2/5 line-clamp-1">{item.nama_menu}</span>
									<span className="w-2/5 pl-5 font-bold">
										{editItemId === item.id_menu ? (
											<input
												type="number"
												value={quantity}
												onChange={handleInputChange}
												onBlur={() => handleBlur(item.id_menu)}
												className="w-12 border rounded p-1"
												autoFocus
											/>
										) : (
											<span
												onClick={() => {
													setEditItemId(item.id_menu);
													setQuantity(item.quantity);
												}}
											>
												{item.quantity}x
											</span>
										)}
									</span>
									<span className="font-bold">
										{item.quantity * item.harga}
									</span>
								</div>
							);
						})}
					</div>

					<div className="flex justify-between font-semibold">
						<span> Total Harga:</span>
						<span> Rp.{totalHarga}</span>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="role"
							className="block text-sm font-medium text-secondary"
						>
							Status Bayar
						</label>
						<select
							id="role"
							value={statusBayar}
							onChange={(e) => setStatusBayar(e.target.value)}
							className="block w-full px-3 py-2 rounded-md border-2 border-tertiary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
							required
						>
							<option value="">Pilih Status Bayar</option>
							<option value="belum_bayar">Belum Bayar</option>
							<option value="lunas">Sudah Bayar</option>
						</select>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium button-transition"
					>
						Submit
					</button>
				</form>
			</div>
			<SelectMejaModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</div>
	);
}
