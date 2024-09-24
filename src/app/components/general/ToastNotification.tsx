"use client";
import { toast, Bounce } from "react-toastify";

const toastSettings = {
	position: "bottom-left",
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	transition: Bounce,
};

export const handleToastResponse = (response: {
	success: boolean;
	message: string;
}) => {
	if (response.success) {
		// @ts-expect-error toast
		toast.success(response.message, toastSettings);
	} else {
		// @ts-expect-error toast
		toast.error(response.message, toastSettings);
	}
};
