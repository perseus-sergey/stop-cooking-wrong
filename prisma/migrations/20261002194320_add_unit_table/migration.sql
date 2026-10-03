/*
  Warnings:

  - You are about to drop the column `unit` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `unitId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UnitCategory" AS ENUM ('MASS', 'VOLUME', 'COUNT', 'QUALITATIVE');

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "unit",
ADD COLUMN     "unitId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "IngredientUnit";

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "category" "UnitCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_code_key" ON "Unit"("code");

-- CreateIndex
CREATE INDEX "Ingredient_unitId_idx" ON "Ingredient"("unitId");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
