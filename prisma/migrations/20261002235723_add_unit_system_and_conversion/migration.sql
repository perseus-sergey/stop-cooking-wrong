/*
  Warnings:

  - Added the required column `system` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UnitSystem" AS ENUM ('METRIC', 'US', 'UNIVERSAL');

-- AlterEnum
ALTER TYPE "UnitCategory" ADD VALUE 'COOKING';

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "system" "UnitSystem" NOT NULL;

-- CreateIndex
CREATE INDEX "Unit_system_idx" ON "Unit"("system");
