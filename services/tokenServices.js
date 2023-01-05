import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const generateTokens = async (payload) => {
  const accesToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "10m",
  })

  return {
    accesToken,
    refreshToken,
  }
}

const generateResetPasswordToken = async (payload) => {
  const resetToken = jwt.sign(payload, process.env.JWT_RESET_TOKEN, {
    expiresIn: "1h",
  })
  return {
    resetToken,
  }
}

const saveToken = async (id, refreshToken) => {
  const tokenData = await prisma.token.findFirst({
    where: {
      userId: id,
    },
  })

  // check if token exists
  if (tokenData) {
    const token = await prisma.token.update({
      where: {
        id: tokenData.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    })
    return token
  }

  // save token
  const token = await prisma.token.create({
    data: {
      userId: id,
      refreshToken: refreshToken,
    },
  })
  return token
}

const removeTokenServices = async (refreshToken) => {
  const t = await prisma.token.findFirst({
    where: {
      refreshToken,
    },
  })

  console.log(t)

  const token = await prisma.token.delete({
    where: {
      id: t.id,
    },
  })
  return token
}

const findToken = async (refreshToken) => {
  const token = await prisma.Token.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  })
  return token
}

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return userData
  } catch (error) {
    return null
  }
}

const validateAccesToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return userData
  } catch (error) {
    return null
  }
}

const validateResetToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_RESET_TOKEN)
    return userData
  } catch (error) {
    return null
  }
}

export {
  generateTokens,
  saveToken,
  removeTokenServices,
  findToken,
  validateRefreshToken,
  validateAccesToken,
  generateResetPasswordToken,
  validateResetToken,
}
