import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const root = {
  createBrand: ({ input }) => {
    console.log(input)
    return input
  },
}

export default root
