import { createPaginator } from "prisma-pagination"

const pagination = (req, res, next) => {
  req.paginate = createPaginator({ page: req.query.page, perPage: 10 })

  next()
}

export default pagination
