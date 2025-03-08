/*
  Warnings:

  - A unique constraint covering the columns `[week]` on the table `Week` will be added. If there are existing duplicate values, this will fail.
  - Made the column `week` on table `Planning` required. This step will fail if there are existing NULL values in that column.
  - Made the column `week` on table `Week` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Planning" ALTER COLUMN "week" SET NOT NULL;

-- AlterTable
ALTER TABLE "Week" ALTER COLUMN "week" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Week_week_key" ON "Week"("week");

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_week_fkey" FOREIGN KEY ("week") REFERENCES "Week"("week") ON DELETE RESTRICT ON UPDATE CASCADE;
