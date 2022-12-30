import nodemailer from "nodemailer"

const mailService = async (email, link) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  transporter.sendMail(
    {
      from: "cakctusinc@gmail.com",
      to: email,
      subject: "Registration confirmation",
      text: "",
      html: `
        <div>
            <h1>Activation</h1>
            <a href=${link}>${link}</a>
        </div>
    `,
    },
    (err, info) => {
      console.log(err)
    }
  )
}

const resetPasswordEmail = async (email, link) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  transporter.sendMail(
    {
      from: "cakctusinc@gmail.com",
      to: email,
      subject: "Resset Password",
      text: "",
      html: `
        <div>
            <h1>Reset Password link</h1>
            <a href=${link}>${link}</a>
        </div>
    `,
    },
    (err, info) => {
      console.log(err)
    }
  )
}

export { mailService, resetPasswordEmail }
