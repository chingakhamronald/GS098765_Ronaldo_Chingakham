-- DropForeignKey
ALTER TABLE "Planning" DROP CONSTRAINT "Planning_skuId_fkey";

-- DropForeignKey
ALTER TABLE "Planning" DROP CONSTRAINT "Planning_storeId_fkey";

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("skuId") ON DELETE CASCADE ON UPDATE CASCADE;
