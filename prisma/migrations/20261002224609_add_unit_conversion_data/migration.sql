-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "baseUnitId" TEXT,
ADD COLUMN     "conversionFactor" DECIMAL(12,6);

-- CreateIndex
CREATE INDEX "Unit_category_idx" ON "Unit"("category");

-- CreateIndex
CREATE INDEX "Unit_baseUnitId_idx" ON "Unit"("baseUnitId");

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_baseUnitId_fkey" FOREIGN KEY ("baseUnitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
