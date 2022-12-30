import {
  registrationServices,
  activationLink,
  loginServices,
  logoutServices,
  refreshTokenServices,
  getUsersServices,
} from "../services/usersServices.js"

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { obj } = await registrationServices(email, password)

    // res.cookie("refreshToken", obj.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // })

    return res.status(200).json(obj)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { obj } = await loginServices(email, password)

    res.cookie("refreshToken", obj.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    return res.status(200).json(obj)
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const data = await logoutServices(refreshToken)
    res.clearCookie("refreshToken")
    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

const activate = async (req, res, next) => {
  try {
    const link = req.params.link
    await activationLink(link)
    return res.redirect("http://localhost:3000/")
  } catch (error) {
    next(error)
  }
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const data = await refreshTokenServices(refreshToken)
    console.log(data)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await getUsersServices()
    return users
  } catch (error) {
    next(error)
  }
}

export { registration, login, logout, activate, refresh, getUsers }
