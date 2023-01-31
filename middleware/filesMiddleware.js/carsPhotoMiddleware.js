import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/brands_img")
  },
  filename: function (req, file, cb) {
    const name = file.originalname
    const fName = name.replace(/\s+/g, "_")
    cb(null, file.originalname)
  },
})

const brandPhoto = multer({ storage: storage })

const storageModel = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/models_img")
  },
  filename: function (req, file, cb) {
    const name = file.originalname
    const fName = name.replace(/\s+/g, "_")
    cb(null, file.originalname)
  },
})

const modelPhoto = multer({ storage: storageModel })

const storageGeneration = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/generations_img")
  },
  filename: function (req, file, cb) {
    const name = file.originalname
    const fName = name.replace(/\s+/g, "_")
    cb(null, file.originalname)
  },
})

const generationPhoto = multer({ storage: storageGeneration })

const storageModification = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/mods_img")
  },
  filename: function (req, file, cb) {
    const name = file.originalname
    const fName = name.replace(/\s+/g, "_")
    cb(null, file.originalname)
  },
})

const modificationPhoto = multer({ storage: storageModification })

export default { brandPhoto, modelPhoto, generationPhoto, modificationPhoto }
