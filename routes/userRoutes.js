import { Router } from "express"
import {
  getUserProfile,
  updateUserPhotos,
} from "../controllers/userControllers.js"
import userPhotos from "../middleware/filesMiddleware.js/userPhotoMiddleware.js"

const router = Router()

router.get("/get-profile/:id", getUserProfile)
router.post(
  "/update-user-photo",
  userPhotos.single("userPhoto"),
  updateUserPhotos
)

export default router
