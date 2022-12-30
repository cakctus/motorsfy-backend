import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const bodyTypes = await prisma.cars_modification.findMany({
  // include: {
  //   body_type: true,
  // },
})

let unique = [...new Set(bodyTypes.map((item) => item.body_type))]

// console.log(bodyTypes)

const createCars = async (req, res, next) => {
  try {
    const { id, json } = req.body
    // const { color } = req.body
    console.log(
      req.files.map((item) => {
        console.log(item)
      })
    )
    // json[0].wheel.map((item) => {
    //   console.log(item)
    // })
    // console.log(req.files)
    // await prisma.car.create({
    //   data: {
    //     car: "BMW 5 series",
    //     userId: id,
    //     model: {
    //       colorImage: ""
    //     }
    //   },
    // })
    res.json({ msg: "success" })
  } catch (error) {
    console.log(error)
  }
}

const listOfCars = async (req, res) => {
  try {
    const { id } = req.params
    const cars = await prisma.car.findMany({
      where: {
        userId: Number(id),
      },
    })
    res.json({ cars: cars })
  } catch (error) {
    console.log(error)
  }
}

export default { createCars, listOfCars }
