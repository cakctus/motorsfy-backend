import { Router } from "express"
import {
  registration,
  login,
  logout,
  activate,
  refresh,
  getUsers,
} from "../controllers/authControllers.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

router.post("/registration", registration)
router.post("/login", login)
router.post("/logout", logout)
router.get("/activate/:link", activate)
router.get("/refresh", refresh)
router.get("/users", getUsers)

export default router
