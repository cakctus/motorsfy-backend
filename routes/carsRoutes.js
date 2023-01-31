import { Router } from "express"
import fileMiddleware from "../middleware/filesMiddleware.js/carsPhotoMiddleware.js"
import carsControllers from "../controllers/carsControllers.js"
import stuffMiddleware from "../middleware/stuffMiddleware.js"
const router = Router()

router.post(
  "/create-brand/",
  fileMiddleware.brandPhoto.single("photo"),
  carsControllers.createBrandController
)
router.get("/get-all-brands/", carsControllers.getAllBrandsController)
router.post(
  "/create-model/",
  fileMiddleware.modelPhoto.single("image"),
  carsControllers.createModelController
)
router.get("/get-all-models/:brandId", carsControllers.getAllModelsController)
router.post(
  "/create-generation/",
  fileMiddleware.generationPhoto.single("image"),
  carsControllers.createGenerationController
)
router.get(
  "/get-all-generation/:modelId",
  carsControllers.getModificationController
)
router.post(
  "/create-modification/",
  fileMiddleware.modificationPhoto.single("image"),
  carsControllers.createModificationController
)

export default router
