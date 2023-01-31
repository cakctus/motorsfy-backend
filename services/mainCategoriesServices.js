import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { createPaginator } from "prisma-pagination"

const prisma = new PrismaClient()
const paginate = createPaginator({ perPage: 10 })

const newCarsListServices = async () => {
  const prevYear = new Date().getFullYear() - 1
  const currentYear = new Date().getFullYear()
  const data = await prisma.cars_model.findMany({
    where: {
      cars_generation: {
        every: {
          cars_modification: {
            every: {
              start_prod: {
                gte: prevYear.toString() || currentYear.toString(),
              },
            },
          },
        },
      },
    },
    include: {
      cars_generation: {
        include: {
          cars_modification: {
            where: {
              start_prod: prevYear.toString() || currentYear.toString(),
            },
          },
        },
      },
    },
  })
  // const json = JSON.stringify(data, (key, value) =>
  //   typeof value === "bigint" ? value.toString() : value
  // )
  // const parse = JSON.parse(json)
  const newc = data.map((item) => {
    return item.cars_generation
  })
  const res = newc.flat().filter((item) => item.cars_modification.length !== 0)
  console.log(res)
  return {
    data: res,
  }
}

const getCarsByBodyServices = async () => {
  const data = await prisma.cars_model.findMany({
    include: {
      cars_generation: {
        include: {
          cars_modification: true,
        },
      },
    },
  })
  // const json = JSON.stringify(data, (key, value) =>
  //   typeof value === "bigint" ? value.toString() : value
  // )
  // const parse = JSON.parse(json)
  const bodyType = data.map((item) => {
    return item.cars_generation
  })
  const bodyTypeResponse = bodyType.flat().map((item) => item.cars_modification)
  const botyTypes = bodyTypeResponse
    .flat()
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.body_type === value.body_type)
    )
  const res = botyTypes.map((item) => item.body_type)
  return res
}

const topEvByRangeServices = async () => {
  const modifications = await prisma.cars_modification.findMany({
    where: {
      cars_performance: {
        fuel_type: {
          contains: "Electricity",
        },
      },
    },
    include: {
      cars_electriccarshybrids: {
        select: {
          all_electric_range: true,
        },
      },
      cars_generation: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  // const performance = await prisma.cars_performance.findMany({
  //   where: {
  //     fuel_type: {
  //       contains: "Electricity",
  //     },
  //   },
  //   select: {
  //     cars_modification: {
  //       select: {
  //         // cars_generation: true,
  //         cars_electriccarshybrids: {
  //           select: {
  //             all_electric_range: true,
  //             cars_modification: {
  //               select: {
  //                 cars_generation: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })

  const electrics = modifications.filter(
    (item) =>
      item.cars_electriccarshybrids !== null &&
      item.cars_electriccarshybrids.all_electric_range !== null
  )
  const json = JSON.stringify(electrics, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString()
    }
    if (key === "all_electric_range") {
      return Number(Number.parseFloat(value).toFixed(1))
    }
    return value
  })
  const parse = JSON.parse(json)
  const sort = (prop, arr) => {
    prop = prop.split(".")
    const len = prop.length
    arr.sort((a, b) => {
      let i = 0
      while (i < len) {
        a = a[prop[i]]
        b = b[prop[i]]
        i++
      }
      if (a > b) {
        return -1
      } else if (a < b) {
        return 1
      } else {
        return 0
      }
    })
    return arr
  }
  const finalResponse = sort(
    "cars_electriccarshybrids.all_electric_range",
    parse
  )
  const electrics2 = finalResponse.filter(
    (item) =>
      item.cars_electriccarshybrids !== null &&
      item.cars_electriccarshybrids.all_electric_range !== null
  )
  // const fuelType = parse.map((item) => {
  //   return item.cars_performance
  // })
  // const fuelTypeResponse = fuelType.filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.fuel_type === value.fuel_type)
  // )
  return electrics2
}

const topCarsBySpeedServices = async () => {
  const modifications = await prisma.cars_modification.findMany({
    // where: {
    //   cars_performance: {
    //     fuel_type: {
    //       contains: "Electricity",
    //     },
    //   },
    // },
    include: {
      cars_performance: {
        select: {
          acceleration_0_100_km_h: true,
          acceleration_0_60_mph: true,
        },
      },
      cars_generation: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
  const performance = modifications.filter(
    (item) =>
      item.cars_performance !== null &&
      item.cars_performance.acceleration_0_100_km_h !== null &&
      item.cars_performance.acceleration_0_100_km_h !== null
  )
  const json = JSON.stringify(performance, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString()
    }
    if (key === "acceleration_0_100_km_h") {
      return parseFloat(value)
    }

    if (key === "acceleration_0_60_mph") {
      return parseFloat(value)
    }
    return value
  })
  const parse = JSON.parse(json)
  const sort = (prop, arr) => {
    prop = prop.split(".")
    const len = prop.length
    arr.sort((a, b) => {
      let i = 0
      while (i < len) {
        a = a[prop[i]]
        b = b[prop[i]]
        i++
      }
      if (a < b) {
        return -1
      } else if (a > b) {
        return 1
      } else {
        return 0
      }
    })
    return arr
  }
  const finalResponse = sort("cars_performance.acceleration_0_100_km_h", parse)
  const performanceResult = finalResponse.filter(
    (item) =>
      item.cars_performance !== null &&
      item.cars_performance.acceleration_0_100_km_h !== null
  )
  return performanceResult.slice(0, 100)
}

const carsBrandsSearchByBodyServices = async () => {
  const brands = await prisma.cars_brand.findMany({
    // include: {
    //   cars_model: {
    //     include: {
    //       cars_generation: {
    //         include: {
    //           cars_modification: true,
    //         },
    //       },
    //     },
    //   },
    // },
  })
  const json = JSON.stringify(brands, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const carsBodySearchResultServices = async (brand, bodyType, page) => {
  if (brand === "null") {
    const data = await prisma.cars_model.findMany({
      where: {
        cars_generation: {
          every: {
            cars_modification: {
              every: {
                body_type: {
                  contains: bodyType,
                },
              },
            },
          },
        },
      },
      include: {
        cars_generation: {
          include: {
            cars_modification: {
              where: {
                body_type: {
                  contains: bodyType,
                },
              },
            },
          },
        },
      },
    })
    const json = JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
    const parse = JSON.parse(json)
    const maps = parse.map((item) => item.cars_generation)
    const maps2 = maps
      .flat()
      .filter((item) => item.cars_modification.length > 0)
    return {
      data: maps2,
    }
  }
  if (bodyType === "null") {
    const data = await prisma.cars_model.findMany({
      where: {
        brand_id: Number(brand),
      },
      include: {
        cars_generation: {
          include: {
            cars_modification: true,
          },
        },
      },
    })
    const json = JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
    const parse = JSON.parse(json)
    const maps = parse.map((item) => item.cars_generation)
    const maps2 = maps
      .flat()
      .filter((item) => item.cars_modification.length > 0)
    return {
      data: maps2,
    }
  }
  const data = await prisma.cars_model.findMany({
    where: {
      brand_id: Number(brand),
      cars_generation: {
        some: {
          cars_modification: {
            some: {
              body_type: {
                equals: bodyType,
              },
            },
          },
        },
      },
    },
    include: {
      cars_generation: {
        include: {
          cars_modification: {
            where: {
              body_type: {
                equals: bodyType,
              },
            },
          },
        },
      },
    },
  })
  const json = JSON.stringify(data, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  const maps = parse.map((item) => item.cars_generation)
  const maps2 = maps.flat().filter((item) => item.cars_modification.length > 0)
  // const map3 = maps2.flat()
  // const maps4 = map3.filter((item) => item.body_type === bodyType)
  return {
    data: maps2,
  }
}

export {
  newCarsListServices,
  getCarsByBodyServices,
  topEvByRangeServices,
  topCarsBySpeedServices,
  carsBrandsSearchByBodyServices,
  carsBodySearchResultServices,
}
