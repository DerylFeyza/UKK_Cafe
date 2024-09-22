"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearOrderList, updateOrderQuantity } from "@/redux/slices/orderSlice";
export default function TransactionForm() {
	const orderList = useSelector((state: RootState) => state.orderList);
	const dispatch = useDispatch();
	const [editItemId, setEditItemId] = useState<string | null>(null);
	const [quantity, setQuantity] = useState<number | string>("");
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

	return (
		<div className="bg-white shadow-lg rounded-lg">
			<div className="p-8">
				<form className="space-y-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-secondary">Add Menu</h2>
						<button
							type="button"
							onClick={() => dispatch(clearOrderList())}
							className="button-transition p-2 rounded-lg"
						>
							Clear
						</button>
					</div>

					{orderList.map((item) => (
						<div key={item.id_menu} className="flex flex-nowrap">
							<span className="w-2/5">{item.nama_menu}</span>
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
							<span className="font-bold">{item.quantity * item.harga}</span>
						</div>
					))}

					<button
						type="submit"
						className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium button-transition"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
