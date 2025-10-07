import nodemailer from 'nodemailer'

interface sendEmailType {
  title: string
  html: string
  sendTo: string
}

export const sendEmail = async ({ title, html, sendTo }: sendEmailType) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.jino.ru',
    port: 587,
    secure: false,
    auth: {
      user: process.env.PROCESS_USER,
      pass: process.env.PROCESS_PASS,
    },
  })
  try {
    const info = await transporter.sendMail({
      from: 'info@tehno-rost.ru',
      to: sendTo,
      subject: title,
      html: html,
    })

    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
