-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'kasir', 'manajer');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('belum_bayar', 'lunas');

-- CreateEnum
CREATE TYPE "Jenis" AS ENUM ('makanan', 'minuman');

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "nama_user" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id_transaksi" TEXT NOT NULL,
    "tgl_transaksi" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_meja" TEXT NOT NULL,
    "nama_pelanggan" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateTable
CREATE TABLE "DetailTransaksi" (
    "id_detail_transaksi" TEXT NOT NULL,
    "id_transaksi" TEXT NOT NULL,
    "id_menu" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "DetailTransaksi_pkey" PRIMARY KEY ("id_detail_transaksi")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id_menu" TEXT NOT NULL,
    "nama_menu" TEXT NOT NULL,
    "jenis" "Jenis" NOT NULL,
    "deskripsi" TEXT,
    "gambar" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id_menu")
);

-- CreateTable
CREATE TABLE "Meja" (
    "id_meja" TEXT NOT NULL,
    "nomor_meja" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Meja_pkey" PRIMARY KEY ("id_meja")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Meja_nomor_meja_key" ON "Meja"("nomor_meja");

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_meja_fkey" FOREIGN KEY ("id_meja") REFERENCES "Meja"("id_meja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaksi" ADD CONSTRAINT "DetailTransaksi_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "Transaksi"("id_transaksi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaksi" ADD CONSTRAINT "DetailTransaksi_id_menu_fkey" FOREIGN KEY ("id_menu") REFERENCES "Menu"("id_menu") ON DELETE RESTRICT ON UPDATE CASCADE;
