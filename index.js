import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"
// routes
import carsRoutes from "./routes/carsRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import resetPasswordRoutes from "./routes/resetPasswordRoutes.js"
import mainRoutes from "./routes/mainRoutes.js"
import getCars from "./routes/getCars.js"
import mainCategory from "./routes/mainCategoryRoutes.js"

// middleware
import errorMiddleware from "./middleware/errorMiddleware.js"

import { PrismaClient } from "@prisma/client"

const PORT = process.env.PORT || 5000
const prisma = new PrismaClient()
const app = express()

// middleware
app.use(compression())
app.use(express.static("media"))
app.use(express.json({ limit: "300mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
)

// routes
app.use("/api", carsRoutes)
app.use("/api", authRoutes)
app.use("/api", resetPasswordRoutes)
app.use("/api", mainRoutes)
app.use("/api", getCars)
app.use("/api", mainCategory)
app.use(errorMiddleware)
app.use(clientErrorHandler)

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" })
  } else {
    next(err)
  }
}

const start = async () => {
  try {
    await prisma.$connect
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
