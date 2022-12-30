import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import {
  validateResetToken,
  generateResetPasswordToken,
} from "./tokenServices.js"
import { resetPasswordEmail } from "./mailServices.js"
import ApiError from "../exceptions/apiError.js"

const prisma = new PrismaClient()

const forgotPasswordServices = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) throw ApiError.BadRequest("This user does not exist")

  const obj = {
    userId: user.id,
    email: user.email,
    isActivated: user.isActivated,
    resetToken: "",

    set setResetToken(value) {
      this.resetToken = value
    },
  }

  const tokens = generateResetPasswordToken({ ...obj })

  tokens.then((res) => {
    obj.setResetToken = res.resetToken
  })

  return {
    obj,
  }
}

const sendTokenLink = async (email, link) => {
  await resetPasswordEmail(email, `http://localhost:3000/reset/${link}`)

  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      resetPasswordLink: link,
    },
  })

  return user
}

const resetPasswordServices = async (link, newPassword) => {
  const token = link

  const validateToken = validateResetToken(token)

  const user = await prisma.user.findUnique({
    where: {
      resetPasswordLink: link,
    },
  })

  if (!validateToken) throw new Error("This Token doesn exist")

  if (!user) throw new Error("User with this token doesn exist")

  const hash = await bcrypt.hash(newPassword, 3)

  const userUpdate = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hash,
    },
  })
  return userUpdate
}

export { forgotPasswordServices, sendTokenLink, resetPasswordServices }
