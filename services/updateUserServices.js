import { unlink } from "node:fs/promises"
import { fileURLToPath } from "url"
import { dirname, basename, extname, join } from "path"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getUserProfileServices = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      lastLogin: true,
      isSuperuser: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      userPhoto: true,
      isStaff: true,
      isActive: true,
      dateJoined: true,
      isActivated: true,
    },
  })
  return user
}

const updateUserPhotoServices = async (
  userId,
  destination,
  filename,
  path,
  username,
  firstName,
  lastName
) => {
  const fName = filename?.replace(/\s+/g, "_")
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  console.log(userId, destination, fName)

  // if (user === null || user === undefined) {
  //   throw new Error("This user doesn't exist")
  // }

  if (user.userPhoto === "") {
    const userUpdate = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userPhoto: fName,
        username: username !== "null" || "undefined" ? username : undefined,
        firstName: firstName !== "null" || "undefined" ? firstName : undefined,
        lastName: lastName !== "null" || "undefined" ? lastName : undefined,
      },
    })
    return userUpdate
  }

  if (user.userPhoto.length > 0) {
    try {
      const __filename = fileURLToPath(import.meta.url)
      const __dirname = dirname(__filename)
      const f = `media/profile/users/${user.userPhoto}`

      console.log(dirname(process.cwd()) + join("/", f)) // /users/joe
      //   console.log(basename(f)) // notes.txt
      //   console.log(extname(f))
      console.log(join("/", f))
      const j = join("/", f)
      await unlink(destination + "\\" + `${user.userPhoto}`)
      console.log("successfully deleted")
    } catch (error) {
      console.error("there was an error:", error.message)
    }
  }
  const userUpdate = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      userPhoto: fName,
      username: username !== "null" || "undefined" ? username : undefined,
      firstName: firstName !== "null" || "undefined" ? firstName : undefined,
      lastName: lastName !== "null" || "undefined" ? lastName : undefined,
    },
  })
  return userUpdate
}

export { getUserProfileServices, updateUserPhotoServices }
