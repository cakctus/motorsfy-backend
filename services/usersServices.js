import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { mailService, resetPasswordEmail } from "./mailServices.js"
import {
  generateTokens,
  saveToken,
  removeTokenServices,
  findToken,
  validateRefreshToken,
  generateResetPasswordToken,
  validateResetToken,
} from "./tokenServices.js"
import ApiError from "../exceptions/apiError.js"

const prisma = new PrismaClient()

const registrationServices = async (email, password) => {
  // check if user already exists
  const candidate = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (candidate) {
    throw ApiError.BadRequest(`User with ${candidate.email} already registered`)
  }
  // create user
  const hash = await bcrypt.hash(password, 3)
  const activationLink = uuidv4()
  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      activationLink,
      dateJoined: new Date(),
    },
  })
  // send a email with verify
  // await mailService(
  //   email,
  //   `http://localhost:5000/api/activate/${activationLink}`
  // )

  // user dto
  const obj = {
    userId: user.id,
    email: user.email,
    isActivated: user.isActivated,
    accessToken: "",
    refreshToken: "",

    set setAccesToken(value) {
      this.accessToken = value
    },

    set setRefreshToken(value) {
      this.refreshToken = value
    },
  }
  // generate token
  const tokens = generateTokens({ ...obj })

  tokens.then((res) => {
    saveToken(obj.userId, res.refreshToken)
    obj.setAccesToken = res.accesToken
    obj.setRefreshToken = res.refreshToken
  })

  return {
    ...tokens,
    obj,
  }
}

const activationLink = async (link) => {
  const user = await prisma.user.findUnique({
    where: {
      activationLink: link,
    },
  })

  if (!user) {
    throw ApiError.BadRequest("This user does not exist")
  }

  await prisma.user.update({
    where: {
      activationLink: link,
    },
    data: {
      isActivated: true,
    },
  })
}

const loginServices = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    throw ApiError.BadRequest("This user doesnt exist")
  }

  const isPassEqual = await bcrypt.compare(password, user.password)

  if (!isPassEqual) {
    throw ApiError("Password is not correct")
  }

  const obj = {
    userId: user.id,
    email: user.email,
    isActivated: user.isActivated,
    accessToken: "",
    refreshToken: "",

    set setAccesToken(value) {
      this.accessToken = value
    },

    set setRefreshToken(value) {
      this.refreshToken = value
    },
  }

  const tokens = generateTokens({ ...obj })

  tokens.then((res) => {
    saveToken(user.id, res.refreshToken)
    obj.setAccesToken = res.accesToken
    obj.setRefreshToken = res.refreshToken
  })

  return {
    ...tokens,
    obj,
  }
}

const logoutServices = async (refreshToken) => {
  const token = await removeTokenServices(refreshToken)
  return token
}

const refreshTokenServices = async (refreshToken) => {
  if (!refreshToken) throw ApiError.UnauthorizedError()

  const dbToken = await findToken(refreshToken)
  const userToken = await validateRefreshToken(refreshToken)

  if (!dbToken || !userToken) throw ApiError.UnauthorizedError()

  const obj = {
    userId: userToken.id,
    email: userToken.email,
    isActivated: userToken.isActivated,
    refreshToken: "",

    set setRefreshToken(value) {
      this.refreshToken = value
    },
  }

  const tokens = generateTokens({ ...obj })

  tokens.then((res) => {
    saveToken(obj.userId, res.refreshToken)
    obj.accessToken = res.accesToken
    obj.setRefreshToken = res.refreshToken
  })

  return {
    obj,
  }
}

const getUsersServices = async () => {
  const users = await prisma.user.findMany()
  return users
}

export {
  registrationServices,
  activationLink,
  loginServices,
  logoutServices,
  refreshTokenServices,
  getUsersServices,
}
