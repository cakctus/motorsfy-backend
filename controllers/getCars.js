import * as carServices from "../services/searchServices.js"
import {
  putRatingServices,
  getRatingCarServices,
} from "../services/ratingServices.js"

const GetListBrands = async (req, res, next) => {
  try {
    const data = await carServices.listBrandsServices()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getListModels = async (req, res, next) => {
  try {
    const { brandName } = req.params
    const data = await carServices.getListModelsServices(brandName)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getListGenerationMain = async (req, res, next) => {
  try {
    const { modelId } = req.params
    console.log(req.params, "getCars controler")
    const data = await carServices.getlistGenerationsMainServices(
      Number(modelId)
    )
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getListGeneration = async (req, res, next) => {
  try {
    const { modelId } = req.params
    const page = req.query.page
    console.log(req.params, "getCars controler")
    console.log(page)
    const data = await carServices.getlistGenerationsServices(
      Number(modelId),
      page
    )
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getListModification = async (req, res, next) => {
  try {
    const { generationId } = req.params
    const data = await carServices.listModificationsServices(
      Number(generationId)
    )
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getModificationDetail = async (req, res, next) => {
  try {
    const { modificationId } = req.params
    console.log("details")
    const data = await carServices.ModificationsDetailServices(
      Number(modificationId)
    )
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const putRatingForModification = async (req, res, next) => {
  try {
    const { id, rating, userId } = req.body
    const data = await putRatingServices(Number(id), rating, Number(userId))
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getRatingForModification = async (req, res, next) => {
  try {
    const { modificationId } = req.params
    const data = await getRatingCarServices(Number(modificationId))
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const createCarComment = async (req, res, next) => {
  try {
    const { comment, modificationId, userId } = req.body
    const data = await carServices.createCarCommentServices(
      Number(modificationId),
      comment,
      Number(userId)
    )
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getCarComment = async (req, res, next) => {
  try {
    const { modificationId } = req.params
    const data = await carServices.getCarCommentServices(Number(modificationId))
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

export {
  GetListBrands,
  getListModels,
  getListGeneration,
  getListModification,
  getModificationDetail,
  putRatingForModification,
  getRatingForModification,
  createCarComment,
  getCarComment,
  getListGenerationMain,
}
