-- AlterTable
ALTER TABLE "Recept" ALTER COLUMN "images" DROP NOT NULL,
ALTER COLUMN "images" DROP DEFAULT,
ALTER COLUMN "images" SET DATA TYPE TEXT;
