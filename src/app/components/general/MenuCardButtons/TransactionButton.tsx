"use client";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addItemToOrderList } from "@/redux/slices/orderSlice";
import { Menu } from "@prisma/client";

interface OrderItem {
	id_menu: string;
	nama_menu: string;
	harga: number;
	quantity: number;
}

export default function TransactionButton({ menuData }: { menuData: Menu }) {
	const [isEditing, setIsEditing] = useState(false);
	const [quantity, setQuantity] = useState<number | string>(0);
	const dispatch: AppDispatch = useDispatch();
	const orderList = useSelector((state: RootState) => state.orderList);

	useEffect(() => {
		const item = orderList.find(
			(item: OrderItem) => item.id_menu === menuData.id_menu
		);
		if (item) {
			setQuantity(item.quantity);
		} else {
			setQuantity(0);
		}
	}, [orderList, menuData.id_menu]);

	const handleAddItemToOrderList = (quantity: number) => {
		dispatch(
			addItemToOrderList({
				id_menu: menuData.id_menu,
				nama_menu: menuData.nama_menu,
				harga: menuData.harga,
				quantity: quantity,
			})
		);
	};

	const incrementQuantity = () => {
		setQuantity((prev) => {
			const updatedQuantity = typeof prev === "number" ? prev + 1 : 1;
			handleAddItemToOrderList(updatedQuantity);
			return updatedQuantity;
		});
	};

	const decrementQuantity = () => {
		setQuantity((prev) => {
			const updatedQuantity =
				typeof prev === "number" ? Math.max(0, prev - 1) : 0;
			handleAddItemToOrderList(updatedQuantity);

			return updatedQuantity;
		});
	};

	const handleCartClick = () => {
		const initialQuantity = 1;
		setQuantity(initialQuantity);
		handleAddItemToOrderList(initialQuantity);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "") {
			setQuantity("");
		} else if (!isNaN(Number(value)) && Number(value) >= 0) {
			const newQuantity = Number(value);
			setQuantity(newQuantity);
			handleAddItemToOrderList(newQuantity);
		}
	};

	const handleBlur = () => {
		if (quantity === "") {
			setQuantity(0);
			handleAddItemToOrderList(0);
		}
		setIsEditing(false);
	};

	const handleQuantityClick = () => {
		setIsEditing(true);
	};

	return (
		<div className="h-10 flex items-center">
			{quantity === 0 && !isEditing ? (
				<button
					onClick={handleCartClick}
					className="button-transition rounded-full px-4 py-2 flex items-center space-x-2"
					aria-label="Add to cart"
				>
					<ShoppingCart size={20} />
					<span className="font-semibold">Add</span>
				</button>
			) : (
				<div className="flex items-center bg-primary rounded-full overflow-hidden">
					<button
						onClick={decrementQuantity}
						className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
						aria-label="Decrease quantity"
					>
						<Minus size={20} />
					</button>
					{isEditing ? (
						<input
							type="text"
							value={quantity}
							onChange={handleInputChange}
							onBlur={handleBlur}
							className="font-bold text-white w-8 text-center bg-primary focus:outline-none"
							aria-label="Quantity input"
							autoFocus
						/>
					) : (
						<span
							onClick={handleQuantityClick}
							className="font-bold text-white w-8 text-center cursor-pointer"
							aria-live="polite"
							aria-atomic="true"
						>
							{quantity}
						</span>
					)}
					<button
						onClick={incrementQuantity}
						className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
						aria-label="Increase quantity"
					>
						<Plus size={20} />
					</button>
				</div>
			)}
		</div>
	);
}
