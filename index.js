import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import compression from "compression"
// graphql
import { graphqlHTTP } from "express-graphql"
import carSchema from "./graphql/carSchema.js"
import root from "./graphql/root.js"
// routes
import carsRoutes from "./routes/carsRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import resetPasswordRoutes from "./routes/resetPasswordRoutes.js"
import mainRoutes from "./routes/mainRoutes.js"
import getCars from "./routes/getCars.js"
import mainCategory from "./routes/mainCategoryRoutes.js"
import userRoutes from "./routes/userRoutes.js"
// middleware
import errorMiddleware from "./middleware/errorMiddleware.js"

// prisma
import { PrismaClient } from "@prisma/client"

const PORT = process.env.PORT || 5000
const prisma = new PrismaClient()
const app = express()

// middleware
app.use(compression())
app.use(express.static("media"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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
app.use("/api", userRoutes)
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: carSchema,
    rootValue: root,
  })
)
app.use(errorMiddleware)

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
