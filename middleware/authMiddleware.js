import ApiError from "../exceptions/apiError.js"
import { validateAccesToken } from "../services/tokenServices.js"

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accestToken = authHeader.split(" ")[1]
    if (!accestToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = validateAccesToken(accestToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    req.user = userData

    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}

export default authMiddleware
