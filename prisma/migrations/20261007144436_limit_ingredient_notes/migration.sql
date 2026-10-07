/*
  Warnings:

  - You are about to alter the column `notes` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "notes" SET DATA TYPE VARCHAR(50);
