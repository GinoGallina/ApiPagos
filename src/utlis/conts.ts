import axios from 'axios'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

// Configuración de Axios
export const axiosInstance = axios.create({
    baseURL: `https://api.mercadopago.com/v1`, // URL base de tu API
    headers: {
        'Content-Type': 'application/json', // Establecer el tipo de contenido
        // eslint-disable-next-line no-undef
        Authorization: `Bearer ${process.env.MERCADO_PAGO_VENDEDOR_ACCESS_TOKEN}`, // Agregar el token de autenticación
    },
})

// Configuración de Nodemailer
export const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL, // Tu correo electrónico
        pass: process.env.MAIL_PASSWORD, // Tu contraseña de correo electrónico
    },
})
