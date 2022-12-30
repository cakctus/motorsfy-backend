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

// const brand = await prisma.cars_brand.findMany()

// const model = await prisma.cars_model.findMany({
//   where: {
//     brand_id: 285n,
//   },
// })

// const generation = await prisma.cars_generation.findMany({
//   where: {
//     name: {
//       contains: "Sharan",
//     },
//   },
//   include: {
//     cars_model: true,
//     cars_modification: true,
//   },
// })

// const modification = await prisma.cars_modification.findMany({
//   where: {
//     start_prod: {
//       gte: "2022",
//     },
//   },
//   include: {
//     cars_dimensions: true,
//     cars_drivetrainbrakessuspension: true,
//     cars_electriccarshybrids: true,
//     cars_engineoil: true,
//     cars_generation: true,
//     cars_icengine: true,
//     cars_internalcombustionengine: true,
//     cars_performance: true,
//     cars_spacevolumeweights: true,
//     cars_modification_electric_engine: true,
//   },
// include: {
//   cars_generation: {
//     where: {
//       name: "Sharan",
//     },
//   },
// },
// })

// console.log(brand)
// console.log(model)
// console.log(generation)
// console.log(modification)

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
