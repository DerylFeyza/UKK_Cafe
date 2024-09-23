import { Status } from "@prisma/client";
export type MenuType = {
	nama_menu: string;
	harga: number;
};
export type DetailTransaksiType = {
	id_detail_transaksi: string;
	jumlah: number;
	harga: number;
	Menu: MenuType;
};
export type MejaType = {
	nomor_meja: string;
};

export type UserType = {
	nama_user: string;
};
export type TransaksiType = {
	id_transaksi: string;
	tgl_transaksi: Date;
	nama_pelanggan: string;
	status: Status;
	total: number;
	DetailTransaksi: DetailTransaksiType[];
	Meja: MejaType;
	User: UserType;
};
