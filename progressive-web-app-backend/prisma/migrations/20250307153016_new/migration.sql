/*
  Warnings:

  - You are about to drop the column `sales` on the `Planning` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Planning" DROP COLUMN "sales",
ADD COLUMN     "week" TEXT;
