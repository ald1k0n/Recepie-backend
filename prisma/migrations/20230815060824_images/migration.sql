/*
  Warnings:

  - You are about to drop the column `image` on the `Recept` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recept" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
