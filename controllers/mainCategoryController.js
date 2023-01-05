import * as services from "../services/mainCategoriesServices.js"

const newCarsController = async (req, res, next) => {
  try {
    const data = await services.newCarsListServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getCarsByBodyController = async (req, res, next) => {
  try {
    const data = await services.getCarsByBodyServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const topEvByRangeController = async (req, res, next) => {
  try {
    const data = await services.topEvByRangeServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const topCarsBySpeedController = async (req, res, next) => {
  try {
    const data = await services.topCarsBySpeedServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const carsBrandsSearchByBodyController = async (req, res, next) => {
  try {
    const data = await services.carsBrandsSearchByBodyServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const carsBodySearchResultController = async (req, res, next) => {
  try {
    const page = parseFloat(req.query.page)
    const { brand, bodyType } = req.query
    const data = await services.carsBodySearchResultServices(
      brand,
      bodyType,
      page
    )
    console.log(req.query)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export {
  newCarsController,
  getCarsByBodyController,
  topEvByRangeController,
  topCarsBySpeedController,
  carsBrandsSearchByBodyController,
  carsBodySearchResultController,
}
