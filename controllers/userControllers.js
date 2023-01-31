import {
  getUserProfileServices,
  updateUserPhotoServices,
} from "../services/updateUserServices.js"

const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await getUserProfileServices(Number(id))
    console.log(data)
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

const updateUserPhotos = async (req, res, next) => {
  try {
    console.log(req.body)
    // console.log(req.file)
    const { userId, username, firstName, lastName } = req.body
    const { destination, filename, path } = req.file ? req.file : {}
    const data = await updateUserPhotoServices(
      Number(userId),
      destination,
      filename,
      path,
      username,
      firstName,
      lastName
    )
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export { getUserProfile, updateUserPhotos }
