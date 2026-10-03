/*
  Warnings:

  - You are about to drop the column `amountMetric` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `amountUS` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IngredientUnit" AS ENUM ('GRAM', 'KILOGRAM', 'OUNCE', 'POUND', 'MILLILITER', 'LITER', 'TEASPOON', 'TABLESPOON', 'CUP', 'FLUID_OUNCE', 'PINT', 'QUART', 'GALLON', 'PIECE', 'CLOVE', 'BULB', 'HEAD', 'BUNCH', 'CAN', 'PACKAGE', 'SLICE', 'PINCH', 'DASH', 'TO_TASTE', 'AS_NEEDED');

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "amountMetric",
DROP COLUMN "amountUS",
DROP COLUMN "name",
ADD COLUMN     "amount" DECIMAL(10,3),
ADD COLUMN     "amountMax" DECIMAL(10,3),
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "unit" "IngredientUnit" NOT NULL;

-- CreateTable
CREATE TABLE "ShoppingCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shoppingCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCategory_slug_key" ON "ShoppingCategory"("slug");

-- CreateIndex
CREATE INDEX "ShoppingCategory_isActive_idx" ON "ShoppingCategory"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_shoppingCategoryId_idx" ON "Product"("shoppingCategoryId");

-- CreateIndex
CREATE INDEX "Ingredient_productId_idx" ON "Ingredient"("productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shoppingCategoryId_fkey" FOREIGN KEY ("shoppingCategoryId") REFERENCES "ShoppingCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
