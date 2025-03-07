/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Planning` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sku` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Stores` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Week` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Planning" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Sku" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Stores" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Week" DROP COLUMN "updatedAt";
