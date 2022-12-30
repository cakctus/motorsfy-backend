import {
  forgotPasswordServices,
  resetPasswordServices,
} from "../services/resetPasswordServices.js"
import { sendTokenLink } from "../services/resetPasswordServices.js"

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const { obj } = await forgotPasswordServices(email)
    const user = await sendTokenLink(obj.email, obj.resetToken)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { link } = req.params
    const { newPassword } = req.body
    const data = await resetPasswordServices(link, newPassword)
    console.log(data)
    res.json("Password was changed")
  } catch (error) {
    next(error)
  }
}

export { forgotPassword, changePassword }
