// store/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface OrderItem {
	id_menu: string;
	nama_menu: string;
	harga: number;
	quantity: number;
}

const initialState: OrderItem[] = [];

const orderSlice = createSlice({
	name: "orderList",
	initialState,
	reducers: {
		addItemToOrderList: (
			state,
			action: PayloadAction<{
				id_menu: string;
				nama_menu: string;
				harga: number;
				quantity: number;
			}>
		) => {
			const { id_menu, nama_menu, harga, quantity } = action.payload;
			if (quantity === 0) {
				return state.filter((item) => item.id_menu !== id_menu);
			}
			const existingItem = state.find((item) => item.id_menu === id_menu);

			if (existingItem) {
				existingItem.quantity = quantity;
			} else {
				state.push({ id_menu, nama_menu, harga, quantity });
			}
		},
		updateOrderQuantity: (
			state,
			action: PayloadAction<{
				id_menu: string;
				quantity: number;
			}>
		) => {
			const { id_menu, quantity } = action.payload;
			if (quantity === 0) {
				return state.filter((item) => item.id_menu !== id_menu);
			}
			const existingItem = state.find((item) => item.id_menu === id_menu);
			if (existingItem) {
				existingItem.quantity = quantity;
			}
		},
		clearOrderList: () => {
			return [];
		},
	},
});

export const { addItemToOrderList, clearOrderList, updateOrderQuantity } =
	orderSlice.actions;

export default orderSlice.reducer;
