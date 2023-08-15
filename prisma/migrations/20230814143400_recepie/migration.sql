-- CreateEnum
CREATE TYPE "USER_ROLES" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('SPICY', 'GRILL', 'RUSSIAN', 'ASIAN', 'NATIONAL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "USER_ROLES" NOT NULL DEFAULT 'USER',
    "isBanned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recept" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Categories" NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "receptId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewRecepie" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "receptId" INTEGER NOT NULL,

    CONSTRAINT "ReviewRecepie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewRecepieId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_key" ON "Token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recept_id_key" ON "Recept"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recept_title_key" ON "Recept"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_id_key" ON "Rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewRecepie_id_key" ON "ReviewRecepie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_receptId_fkey" FOREIGN KEY ("receptId") REFERENCES "Recept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRecepie" ADD CONSTRAINT "ReviewRecepie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRecepie" ADD CONSTRAINT "ReviewRecepie_receptId_fkey" FOREIGN KEY ("receptId") REFERENCES "Recept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewRecepieId_fkey" FOREIGN KEY ("reviewRecepieId") REFERENCES "ReviewRecepie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
