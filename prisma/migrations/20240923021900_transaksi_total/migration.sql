/*
  Warnings:

  - Added the required column `total` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaksi" ADD COLUMN     "total" INTEGER NOT NULL;
