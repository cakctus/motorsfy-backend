/*
  Warnings:

  - You are about to drop the column `lastLame` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLame",
ADD COLUMN     "lastName" TEXT;
