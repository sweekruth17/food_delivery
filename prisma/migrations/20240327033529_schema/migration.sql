-- DropIndex
DROP INDEX "Pricing_orgId_key";

-- AlterTable
ALTER TABLE "Pricing" ALTER COLUMN "baseDistance" DROP DEFAULT,
ALTER COLUMN "fixPrice" DROP DEFAULT;
