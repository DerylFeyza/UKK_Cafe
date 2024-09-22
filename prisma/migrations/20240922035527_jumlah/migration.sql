/*
  Warnings:

  - Added the required column `jumlah` to the `DetailTransaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailTransaksi" ADD COLUMN     "jumlah" INTEGER NOT NULL;
