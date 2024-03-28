-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PERISHABLE', 'NONPERISHABLE');

-- CreateEnum
CREATE TYPE "Zone" AS ENUM ('CENTRAL', 'WEST', 'NORTH', 'SOUTH', 'EAST');

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "type" "Type" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "zone" "Zone" NOT NULL,
    "baseDistance" INTEGER NOT NULL DEFAULT 5,
    "fixPrice" INTEGER NOT NULL DEFAULT 10,
    "kmPrice" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_itemId_key" ON "Pricing"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_orgId_key" ON "Pricing"("orgId");

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
