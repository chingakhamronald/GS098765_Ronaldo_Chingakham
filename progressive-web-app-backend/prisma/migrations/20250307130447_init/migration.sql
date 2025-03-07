-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stores" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "storeName" TEXT,
    "state" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sku" (
    "id" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "skuName" TEXT,
    "class" TEXT,
    "department" TEXT,
    "price" TEXT,
    "cost" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL,
    "week" TEXT,
    "weekName" TEXT,
    "month" TEXT,
    "monthLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planning" (
    "id" TEXT NOT NULL,
    "sales" TEXT,
    "units" TEXT,
    "storeId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Stores_storeId_key" ON "Stores"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Sku_skuId_key" ON "Sku"("skuId");

-- CreateIndex
CREATE UNIQUE INDEX "Planning_storeId_key" ON "Planning"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Planning_skuId_key" ON "Planning"("skuId");

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("skuId") ON DELETE RESTRICT ON UPDATE CASCADE;
