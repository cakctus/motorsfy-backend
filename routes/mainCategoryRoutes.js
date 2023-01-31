import { Router } from "express"
import * as mainCategory from "../controllers/mainCategoryController.js"

import cacheMiddleware from "../middleware/cacheMiddleware.js"
import pagination from "../middleware/paginationMiddleware.js"

const router = Router()

router.get("/new-cars/", mainCategory.newCarsController)
router.get("/get-cars-by-body", mainCategory.getCarsByBodyController)
router.get(
  "/top-ev-by-range",
  cacheMiddleware,
  mainCategory.topEvByRangeController
)
router.get(
  "/top-cars-by-speed",
  cacheMiddleware,
  mainCategory.topCarsBySpeedController
)
router.get(
  "/cars-brands-search-by-body",
  mainCategory.carsBrandsSearchByBodyController
)
router.get(
  "/cars-body-search-result",
  pagination,
  mainCategory.carsBodySearchResultController
)

export default router
