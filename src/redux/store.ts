"use client";
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
	reducer: {
		orderList: orderReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
