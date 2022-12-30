import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const putRatingServices = async (modificationId, ratingUser, userId) => {
  const modification = await prisma.cars_modification.findUnique({
    where: {
      id: modificationId,
    },
  })

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  const rating = await prisma.cars_rating.findFirst({
    where: {
      userId: user.id,
    },
  })

  if (rating) {
    const updateRating = await prisma.cars_rating.update({
      where: {
        id: rating.id,
      },
      data: {
        rating: ratingUser,
        cars_modificationId: modification.id,
        userId: user.id,
      },
    })
    return updateRating
  }

  const createRating = await prisma.cars_rating.create({
    data: {
      rating: ratingUser,
      cars_modificationId: modification.id,
      userId: user.id,
    },
  })
  return createRating
}

const getRatingCarServices = async (modificationId) => {
  const rating = await prisma.cars_rating.findMany({
    where: {
      cars_modificationId: modificationId,
    },
  })

  const json = JSON.stringify(rating, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)

  if (parse.length !== 0) {
    const ratings = parse
      .map((rating) => rating.rating)
      .reduce((accumulator, currenValue) => accumulator + currenValue)
    const numberOfRating = rating.length
    const res = ratings / numberOfRating
    return {
      res,
      numberOfRating,
    }
  }

  return {
    res: 0,
    numberOfRating: 0,
  }
}

export { putRatingServices, getRatingCarServices }
