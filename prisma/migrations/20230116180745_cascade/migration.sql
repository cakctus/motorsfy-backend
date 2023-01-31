-- DropForeignKey
ALTER TABLE "cars_modification_electric_engine" DROP CONSTRAINT "cars_modification_el_electricengine_id_216b8965_fk_cars_elec";

-- DropForeignKey
ALTER TABLE "cars_modification_electric_engine" DROP CONSTRAINT "cars_modification_el_modification_id_a25e576b_fk_cars_modi";

-- AddForeignKey
ALTER TABLE "cars_modification_electric_engine" ADD CONSTRAINT "cars_modification_el_electricengine_id_216b8965_fk_cars_elec" FOREIGN KEY ("electricengine_id") REFERENCES "cars_electricengine"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification_electric_engine" ADD CONSTRAINT "cars_modification_el_modification_id_a25e576b_fk_cars_modi" FOREIGN KEY ("modification_id") REFERENCES "cars_modification"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
