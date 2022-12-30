import multer from "multer"

const storage = multer.memoryStorage()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./static/upload/")
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now())
//   },
// })

const upload = multer({ storage: storage })

export { upload }
