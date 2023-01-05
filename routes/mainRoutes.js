import { Router } from "express"
import * as main from "../controllers/mainController.js"

const router = Router()

router.get("/cars-brands-search", main.listBrands)
router.get("/cars-models-search/:brandId", main.listModels)
// router.post("/cars-models", main.listModels)
router.get("/cars-generations-search/", main.listGeneration)
// router.get(
//   "/cars-generations-result/:generationId/:year",
//   main.listGenerationResult
// )
// router.post("/cars-modifications", main.listModifications)
router.get("/list-new-cars", main.listNewCars)
router.post("/search", main.search)

export default router
