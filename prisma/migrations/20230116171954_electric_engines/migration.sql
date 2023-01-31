-- CreateTable
CREATE TABLE "cars_modification_electric_engines" (
    "id" SERIAL NOT NULL,
    "power" VARCHAR(64),
    "torque" VARCHAR(64),
    "location" VARCHAR(128),
    "system_power" VARCHAR(128),
    "system_torque" VARCHAR(128),
    "cars_modificationId" INTEGER,

    CONSTRAINT "cars_modification_electric_engines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_modification_electric_engines" ADD CONSTRAINT "cars_modification_electric_engines_cars_modificationId_fkey" FOREIGN KEY ("cars_modificationId") REFERENCES "cars_modification"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
