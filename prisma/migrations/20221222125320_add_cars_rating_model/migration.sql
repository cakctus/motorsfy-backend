-- CreateTable
CREATE TABLE "cars_rating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "cars_modificationId" BIGINT NOT NULL,

    CONSTRAINT "cars_rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_rating" ADD CONSTRAINT "cars_rating_cars_modificationId_fkey" FOREIGN KEY ("cars_modificationId") REFERENCES "cars_modification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
