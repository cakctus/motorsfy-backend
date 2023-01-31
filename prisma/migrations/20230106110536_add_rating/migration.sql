/*
  Warnings:

  - You are about to drop the `cars_rationg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cars_rationg" DROP CONSTRAINT "cars_rationg_cars_modificationId_fkey";

-- DropForeignKey
ALTER TABLE "cars_rationg" DROP CONSTRAINT "cars_rationg_userId_fkey";

-- DropTable
DROP TABLE "cars_rationg";

-- CreateTable
CREATE TABLE "cars_rating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "cars_modificationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cars_rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_rating" ADD CONSTRAINT "cars_rating_cars_modificationId_fkey" FOREIGN KEY ("cars_modificationId") REFERENCES "cars_modification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_rating" ADD CONSTRAINT "cars_rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
