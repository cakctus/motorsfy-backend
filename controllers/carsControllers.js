import carsServices from "../services/carsServices.js"

const createBrandController = async (req, res, next) => {
  try {
    const { name } = req.body
    const { originalname } = req.file
    const data = await carsServices.createBrandServices(name, originalname)
    res.status(200).json({ created: data, msg: "Created" })
  } catch (error) {
    next(error)
  }
}

const getAllBrandsController = async (req, res, next) => {
  try {
    const { brandId } = req.params
    const data = await carsServices.getAllBrandsServices(Number(brandId))
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

const createModelController = async (req, res, next) => {
  try {
    const { originalname } = req.file
    const { brandId, name } = req.body
    const data = await carsServices.createModelServices(
      Number(brandId),
      name,
      originalname
    )
    res.status(200).json({ created: data, msg: "Created" })
  } catch (error) {
    next(error)
  }
}

const getAllModelsController = async (req, res, next) => {
  try {
    const { brandId } = req.params
    console.log(brandId)
    const data = await carsServices.getAllModelsServices(Number(brandId))
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

const createGenerationController = async (req, res, next) => {
  try {
    const { originalname } = req.file ? req.file : {}
    const { name, modelId } = req.body
    const data = await carsServices.createGenerationServices(
      name,
      Number(modelId),
      originalname
    )
    res.status(200).json({ created: data, msg: "Created" })
  } catch (error) {
    next(error)
  }
}

const getModificationController = async (req, res, next) => {
  try {
    const { modelId } = req.params
    const data = await carsServices.getModificationServices(Number(modelId))
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

const createModificationController = async (req, res, next) => {
  try {
    const { originalname } = req.file
    // const modification = JSON.parse(req.body)
    // const carsDimentions = JSON.parse(req.body)

    // console.log(JSON.parse(req.body.carsElectricCarsHybrids), "control")
    const modification = req.body
    const carsDimentions = JSON.parse(req.body.carsDimentions)
    const cars_drivetrainbrakessuspension = JSON.parse(
      req.body.cars_drivetrainbrakessuspension
    )
    const carsElectricCarsHybrids = JSON.parse(req.body.carsElectricCarsHybrids)
    const carsEngineOil = JSON.parse(req.body.carsEngineOil)
    const carsICEngine = JSON.parse(req.body.carsICEngine)
    const carsInternalCombustionEngine = JSON.parse(
      req.body.carsInternalCombustionEngine
    )
    const carsPerformance = JSON.parse(req.body.carsPerformance)
    const carSpaceVolumeWeights = JSON.parse(req.body.carSpaceVolumeWeights)
    const carsModificationElectricEngine = JSON.parse(
      req.body.carsModificationElectricEngine
    )

    const data = await carsServices.createModificationServices(
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
    )
    // console.log(JSON.parse(req.body.generationId))

    return res.json({ created: data, msg: "success" })
  } catch (error) {
    next(error)
  }
}

export default {
  createBrandController,
  getAllBrandsController,
  createModelController,
  getAllModelsController,
  createGenerationController,
  getModificationController,
  createModificationController,
}
