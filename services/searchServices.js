import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const listBrandsServices = async () => {
  const brands = await prisma.cars_brand.findMany({})
  const json = JSON.stringify(brands, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const getListModelsServices = async (brandName) => {
  const models = await prisma.cars_model.findMany({
    where: {
      cars_brand: {
        name: brandName,
      },
    },
    include: {
      cars_brand: true,
      cars_generation: true,
    },
    orderBy: {
      name: "asc",
    },
  })
  const json = JSON.stringify(models, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const listModelsServices = async (brandId) => {
  const models = await prisma.cars_model.findMany({
    where: {
      brand_id: brandId,
    },
    // include: {
    //   cars_generation: {
    //     include: {
    //       cars_modification: {
    //         where: {
    //           start_prod: {
    //             gte: "2019",
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // select: {
    //   id: true,
    //   name: true,
    //   image: true,
    //   cars_generation: {
    //     select: {
    //       id: true,
    //     },
    //   },
    // },
  })
  const json = JSON.stringify(models, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const getlistGenerationsServices = async (modelId) => {
  const generations = await prisma.cars_generation.findMany({
    where: {
      model_id: Number(modelId),
    },
    include: {
      cars_modification: {
        include: {
          cars_modification_electric_engine: true,
        },
      },
    },
  })
  const json = JSON.stringify(generations, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const listGenerationsServices = async (brandId, modelId, year) => {
  if (modelId === "all") {
    const models = await prisma.cars_model.findMany({
      where: {
        brand_id: brandId,
      },
      include: {
        cars_generation: {
          include: {
            cars_modification: {
              include: {
                cars_modification_electric_engine: true,
              },
            },
          },
        },
      },
    })
    const json = JSON.stringify(models, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
    const parse = JSON.parse(json)
    return parse
  }
  if (modelId !== "all") {
    const generations = await prisma.cars_generation.findMany({
      where: {
        model_id: Number(modelId),
      },
      include: {
        cars_modification: {
          include: {
            cars_modification_electric_engine: true,
          },
        },
      },
    })
    const json = JSON.stringify(generations, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
    const parse = JSON.parse(json)
    return parse
  }
}

const listGenerationsResultServices = async (modelId, year) => {
  const generations = await prisma.cars_generation.findMany({
    where: {
      model_id: modelId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      cars_modification: {
        where: {
          start_prod: {
            gte: year,
          },
        },
      },
    },
  })
  const json = JSON.stringify(generations, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const listModificationsServices = async (generationId) => {
  const modifications = await prisma.cars_modification.findMany({
    where: {
      generation_id: generationId,
    },
  })
  const json = JSON.stringify(modifications, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const ModificationsDetailServices = async (modificationId) => {
  const modifications = await prisma.cars_modification.findUnique({
    where: {
      id: modificationId,
    },
    include: {
      // name: true,
      // image: true,
      // start_prod: true,
      // end_prod: true,
      // powertrain_architecture: true,
      // body_type: true,
      // seats: true,
      // doors: true,
      rating: true,
      comment: {
        orderBy: {
          created: "desc",
        },
        select: {
          user: true,
          id: true,
          comment: true,
          user: true,
          userId: true,
          carsModification: true,
          cars_modificationId: true,
          created: true,
        },
      },
      cars_dimensions: true,
      cars_drivetrainbrakessuspension: true,
      cars_electriccarshybrids: true,
      cars_engineoil: true,
      cars_generation: true,
      cars_icengine: true,
      cars_internalcombustionengine: true,
      cars_performance: true,
      cars_spacevolumeweights: true,
      cars_modification_electric_engine: {
        select: {
          cars_electricengine: true,
        },
      },
    },
  })
  const json = JSON.stringify(modifications, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const createCarCommentServices = async (modificationId, comment, userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  const modification = await prisma.cars_modification.findUnique({
    where: {
      id: modificationId,
    },
  })
  const commentInstance = await prisma.comment.create({
    data: {
      comment,
      // userId: user.id,
      // cars_modificationId: modification.id,
      carsModification: {
        connect: {
          id: modification.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
  const json = JSON.stringify(commentInstance, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const getCarCommentServices = async (modificationId) => {
  const comments = await prisma.comment.findMany({
    where: {
      cars_modificationId: modificationId,
    },
    include: {
      user: true,
    },
    orderBy: [
      {
        created: "desc",
      },
    ],
  })
  const json = JSON.stringify(comments, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
  const parse = JSON.parse(json)
  return parse
}

const searchServices = async (brand, model1) => {
  const model = await prisma.cars_model.findMany({
    where: {
      name: "Sharan",
    },
  })
}

export {
  searchServices,
  listBrandsServices,
  listModelsServices,
  listModificationsServices,
  listGenerationsServices,
  listGenerationsResultServices,
  getListModelsServices,
  ModificationsDetailServices,
  createCarCommentServices,
  getCarCommentServices,
  getlistGenerationsServices,
}
