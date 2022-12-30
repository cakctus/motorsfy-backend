import { Router } from "express"
import * as get from "../controllers/getCars.js"
import cacheMiddleware from "../middleware/cacheMiddleware.js"

const router = Router()

router.get("/cars-brands", get.GetListBrands)
router.get("/cars-models/:brandName", get.getListModels)
router.get("/cars-generations/:modelId", get.getListGeneration)
router.get("/cars-modifications/:generationId", get.getListModification)
router.get(
  "/cars-modifications-detail/:modificationId",
  get.getModificationDetail
)
router.put("/rating/:modificationId", get.putRatingForModification)
router.get("/get-rating/:modificationId", get.getRatingForModification)
router.post("/create-car-comment/:modificationId", get.createCarComment)
router.get("/get-car-comment/:modificationId", get.getCarComment)

export default router
