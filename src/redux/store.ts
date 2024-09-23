"use client";
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";
import mejaReducer from "./slices/mejaSlice";

export const store = configureStore({
	reducer: {
		orderList: orderReducer,
		mejaList: mejaReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
