import { Router } from "express"
import { upload } from "../middleware/fileMiddleware.js"
import carsControllers from "../controllers/carsControllers.js"

const router = Router()

router.post("/create-car", upload.any(), carsControllers.createCars)
router.get("/cars-list/:id", carsControllers.listOfCars)

export default router
