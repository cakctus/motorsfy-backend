import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const pagination = async (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const start = (page - 1) * limit
  const end = page * limit

  const result = {}

  if (end < 1000) {
    result.next = {
      page: page + 1,
      limit: limit,
    }
  }

  if (start > 0) {
    result.previos = {
      page: page - 1,
      limit: limit,
    }
  }

  try {
    result.result = await prisma.model.findMany({
      skip: start,
    })
    res.paginatedResult = result
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  result.result = await model
}

export default pagination
