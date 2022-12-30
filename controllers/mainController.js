import {
  searchServices,
  listBrandsServices,
  listModelsServices,
  listGenerationsServices,
  listGenerationsResultServices,
  listModificationsServices,
} from "../services/searchServices.js"
import * as category from "../services/mainCategoriesServices.js"

const listBrands = async (req, res, next) => {
  try {
    const data = await listBrandsServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const listModels = async (req, res, next) => {
  try {
    const { brandId } = req.params
    const data = await listModelsServices(Number(brandId))
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const listGeneration = async (req, res, next) => {
  try {
    const { brandId, modelId, year } = req.params
    console.log(req.params)
    const data = await listGenerationsServices(Number(brandId), modelId, year)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const listGenerationResult = async (req, res, next) => {
  try {
    const { generationId, year } = req.params
    const data = await listGenerationsResultServices(Number(generationId), year)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

// const listModifications = async (req, res, next) => {
//   try {
//     const generationsId = 8317
//     const data = await listModificationsServices(generationsId)
//     return res.json(data)
//   } catch (error) {
//     next(error)
//   }
// }

const listNewCars = async (req, res, next) => {
  try {
    const data = await category.newCarsListServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const search = async (req, res) => {
  try {
    const { brand, model } = req.body
    return searchServices()
  } catch (error) {
    console.log(error)
  }
}

export {
  search,
  listBrands,
  listModels,
  listGeneration,
  // listModifications,
  listGenerationResult,
  listNewCars,
}
