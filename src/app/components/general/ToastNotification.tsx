"use client";
import { toast, Bounce, ToastPosition } from "react-toastify";

const toastSettings = {
	position: "bottom-left" as ToastPosition,
	autoClose: 1500,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
	transition: Bounce,
};

interface ToastNotificationProps {
	success: boolean;
	message: string;
}

export const handleToastResponse = (response: {
	success: boolean;
	message: string;
}) => {
	if (response.success) {
		toast.success(response.message, toastSettings);
	} else {
		toast.error(response.message, toastSettings);
	}
};
export const handlePromiseToast = (
	promise: Promise<ToastNotificationProps>,
	pendingMessage: string = "Memproses..."
) => {
	return toast.promise(
		promise,
		{
			pending: pendingMessage,
			success: {
				render({ data }: { data: ToastNotificationProps }) {
					return data.message;
				},
			},
			error: {
				render({ data }) {
					const response = data as ToastNotificationProps;
					return response.message;
				},
			},
		},
		toastSettings
	);
};
