import { Router } from "express"
import {
  forgotPassword,
  changePassword,
} from "../controllers/resetPasswordControllers.js"

const router = Router()

router.post("/forgot-password", forgotPassword)
router.post("/change-password/:link", changePassword)

export default router
