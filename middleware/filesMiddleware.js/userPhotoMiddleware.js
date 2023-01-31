import multer from "multer"

// const storage = multer.memoryStorage()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/profile/users")
  },
  filename: function (req, file, cb) {
    const name = file.originalname
    const fName = name.replace(/\s+/g, "_")
    cb(null, Date.now() + "." + fName)
  },
})

const userPhotos = multer({ storage: storage })

export default userPhotos
