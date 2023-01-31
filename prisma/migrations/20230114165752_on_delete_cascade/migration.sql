-- DropForeignKey
ALTER TABLE "cars_generation" DROP CONSTRAINT "cars_generation_model_id_bab53011_fk_cars_model_id";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_dimensions_id_5afe7c8e_fk_cars_dimensions_id";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_drivetrain_brakes_su_0b379a05_fk_cars_driv";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_electric_cars_hybrid_3da51173_fk_cars_elec";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_engine_oil_id_6cac5881_fk_cars_engineoil_id";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_generation_id_091547f4_fk_cars_generation_id";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_ic_engine_id_92d81833_fk_cars_icengine_id";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_internal_combustion__eb1797cf_fk_cars_inte";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_performance_id_24479d2e_fk_cars_perf";

-- DropForeignKey
ALTER TABLE "cars_modification" DROP CONSTRAINT "cars_modification_space_volume_weights_cb92cf4b_fk_cars_spac";

-- AddForeignKey
ALTER TABLE "cars_generation" ADD CONSTRAINT "cars_generation_model_id_bab53011_fk_cars_model_id" FOREIGN KEY ("model_id") REFERENCES "cars_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_dimensions_id_5afe7c8e_fk_cars_dimensions_id" FOREIGN KEY ("dimensions_id") REFERENCES "cars_dimensions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_drivetrain_brakes_su_0b379a05_fk_cars_driv" FOREIGN KEY ("drivetrain_brakes_suspension_id") REFERENCES "cars_drivetrainbrakessuspension"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_electric_cars_hybrid_3da51173_fk_cars_elec" FOREIGN KEY ("electric_cars_hybrids_id") REFERENCES "cars_electriccarshybrids"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_engine_oil_id_6cac5881_fk_cars_engineoil_id" FOREIGN KEY ("engine_oil_id") REFERENCES "cars_engineoil"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_generation_id_091547f4_fk_cars_generation_id" FOREIGN KEY ("generation_id") REFERENCES "cars_generation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_ic_engine_id_92d81833_fk_cars_icengine_id" FOREIGN KEY ("ic_engine_id") REFERENCES "cars_icengine"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_internal_combustion__eb1797cf_fk_cars_inte" FOREIGN KEY ("internal_combustion_engine_id") REFERENCES "cars_internalcombustionengine"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_performance_id_24479d2e_fk_cars_perf" FOREIGN KEY ("performance_id") REFERENCES "cars_performance"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars_modification" ADD CONSTRAINT "cars_modification_space_volume_weights_cb92cf4b_fk_cars_spac" FOREIGN KEY ("space_volume_weights_id") REFERENCES "cars_spacevolumeweights"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
