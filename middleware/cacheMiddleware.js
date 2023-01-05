import NodeCache from "node-cache"

const cache = new NodeCache({ checkperiod: 5 })

function cacheMiddleware(req, res, next) {
  try {
    if (req.method !== "GET") {
      console.log("Cannot cache non-GET method")
      return next()
    }
    // check if key exists in cache
    const key = req.originalUrl
    const cacheResponse = cache.get(key)
    // if it exists, send cache result
    if (cacheResponse) {
      console.log(`Cache hit for ${key}`)
      res.send(cacheResponse)
    } else {
      // if not, replace .send with method send response to cache
      console.log(`Cache miss for ${key}`)
      res.originalSend = res.send
      res.send = (body) => {
        res.originalSend(body)
        cache.set(key, body, cacheMiddleware)
      }
      next()
    }
  } catch (error) {
    next(error)
  }
}

export default cacheMiddleware
