import * as services from "../services/mainCategoriesServices.js"
import pagination from "../middleware/paginationMiddleware.js"

const newCarsController = async (req, res, next) => {
  try {
    const page = parseFloat(req.query.page)
    const limit = parseFloat(req.query.limit)
    const start = (page - 1) * limit
    const end = page * limit
    console.log(req.query)
    const data = await services.newCarsListServices(start, limit, page)
    const response = data.slice(start, end)
    return res.json(response)
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
    console.log(req.body)
    console.log(req.query)
    const page = parseFloat(req.query.page)
    const limit = parseFloat(req.query.limit)
    const start = (page - 1) * limit
    const end = page * limit
    const { brand, bodyType } = req.query
    const data = await services.carsBodySearchResultServices(
      brand,
      bodyType,
      start,
      limit,
      page
    )
    // const response = data.slice(start, end)
    console.log(data.length)
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
