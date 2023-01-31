function stuffMiddleware(req, res, next) {
  try {
    // const authHeader = req.headers.authorization
    console.log(req.headers)
    next()
  } catch (error) {
    return next(error)
  }
}

export default stuffMiddleware
