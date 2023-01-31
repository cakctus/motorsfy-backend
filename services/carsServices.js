import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createBrandServices = async (name, originalname) => {
  const brand = await prisma.cars_brand.create({
    data: {
      name: name,
      image: `brands_img/${originalname}`,
    },
  })
  if (brand) {
    return brand
  }

  if (brand !== true) {
    return null
  }
}

const getAllBrandsServices = async () => {
  const data = await prisma.cars_brand.findMany()
  return data
}

const createModelServices = async (brandId, name, fileName) => {
  const data = await prisma.cars_model.create({
    data: {
      name: name,
      image: `models_img/${fileName}`,
      brand_id: brandId,
    },
  })
  if (data) {
    return data
  }

  if (data !== true) {
    return null
  }
}

const getAllModelsServices = async (brandId) => {
  const data = await prisma.cars_model.findMany({
    where: {
      brand_id: brandId,
    },
  })
  return data
}

const createGenerationServices = async (name, modelId, originalname) => {
  const data = await prisma.cars_generation.create({
    data: {
      name: name,
      image: `generations_img/${originalname}`,
      model_id: modelId,
    },
  })

  if (data) {
    return data
  }

  if (data !== true) {
    return null
  }
}

const getModificationServices = async (modelId) => {
  const modifications = await prisma.cars_generation.findMany({
    where: {
      model_id: modelId,
    },
  })
  return modifications
}

const createModificationServices = async (
  modification,
  originalname,
  carsDimentions,
  cars_drivetrainbrakessuspension,
  carsElectricCarsHybrids,
  carsEngineOil,
  carsICEngine,
  carsInternalCombustionEngine,
  carsPerformance,
  carSpaceVolumeWeights,
  carsModificationElectricEngine
) => {
  const {
    generationId,
    name,
    image,
    startProd,
    endProd,
    powertrainArchitecture,
    bodyType,
    seats,
    doors,
  } = modification
  const createModification = await prisma.cars_modification.create({
    include: {
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
    data: {
      name: JSON.parse(name),
      start_prod: JSON.parse(startProd),
      end_prod: JSON.parse(endProd),
      powertrain_architecture: JSON.parse(powertrainArchitecture),
      body_type: JSON.parse(bodyType),
      seats: JSON.parse(seats),
      doors: JSON.parse(doors),
      image: `mods_img/${originalname}`,
      cars_generation: {
        connect: {
          id: Number(JSON.parse(generationId)),
        },
      },
      cars_dimensions: {
        create: carsDimentions,
      },
      cars_drivetrainbrakessuspension: {
        create: cars_drivetrainbrakessuspension,
      },
      cars_electriccarshybrids: {
        create: carsElectricCarsHybrids,
      },
      cars_icengine: {
        create: carsICEngine,
      },
      cars_internalcombustionengine: {
        create: carsInternalCombustionEngine,
      },
      cars_performance: {
        create: carsPerformance,
      },
      cars_spacevolumeweights: {
        create: carSpaceVolumeWeights,
      },
      cars_modification_electric_engines: {
        createMany: {
          data: carsModificationElectricEngine,
        },
      },
    },
  })

  // console.log(createModification)
  return createModification
}

export default {
  createBrandServices,
  getAllBrandsServices,
  createModelServices,
  getAllModelsServices,
  createGenerationServices,
  getModificationServices,
  createModificationServices,
}
