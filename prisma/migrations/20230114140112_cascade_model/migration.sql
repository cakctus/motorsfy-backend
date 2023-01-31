-- DropForeignKey
ALTER TABLE "cars_model" DROP CONSTRAINT "cars_model_brand_id_37ddf91e_fk_cars_brand_id";

-- AddForeignKey
ALTER TABLE "cars_model" ADD CONSTRAINT "cars_model_brand_id_37ddf91e_fk_cars_brand_id" FOREIGN KEY ("brand_id") REFERENCES "cars_brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
