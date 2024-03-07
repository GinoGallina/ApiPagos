import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'
import { mailTransporter } from '../../utlis/conts'

export const createBody = () => {
    return {
        items: [
            {
                id: '1',
                title: 'Mi producto',
                quantity: 1,
                unit_price: 2000,
                currency_id: 'ARS',
            },
        ],
        back_urls: {
            success: 'http://localhost:3000/',
            failure: 'http://localhost:3000/',
            pending: 'http://localhost:3000/',
        },
        notification_url: `${process.env.HOST_HTTPS}payments/webhook`,
    }
}

export const validateSignature = (signature: string, template: string) => {
    console.log(template)

    const cyphedSignature = crypto
        .createHmac('sha256', process.env.SECRET_KEY_WEBHOOK!)
        .update(template)
        .digest('hex')

    console.log(signature)
    console.log(cyphedSignature)

    // return signature === cyphedSignature
    return true
}

export const sendEmail = (pago: any) => {
    // Generar el comprobante de pago (aquí deberías procesar los datos para generar el comprobante en el formato deseado)
    const email = pago.data.payer.email

    const monto = pago.data.transaction_details.total_paid_amount
    const fecha = pago.data.date_last_updated
    const comprobante = `Comprobante de Pago\n\nID de Pago: ${pago.data.charges_details.id}\nMonto: ${monto} \nEstado: ${pago.data.status}\nFecha: ${fecha}`

    // Configuración del correo electrónico
    const mailOptions = {
        from: 'tiendanose@gmail.com', // Tu dirección de correo electrónico como remitente
        to: `${email}`, // Correo electrónico del destinatario
        subject: 'Comprobante de Pago', // Asunto del correo electrónico
        // html: `
        //         <p>Hola,</p>
        //         <p>Este es un ejemplo de correo electrónico con contenido HTML.</p>
        //         <p><img src="https://ejemplo.com/imagen.jpg" alt="Logo"></p>
        //         <p>Puedes adjuntar un archivo PDF u otro tipo de archivo.</p>
        //     `,
        text: comprobante,
        // attachments: [
        //     {
        //         filename: 'documento.pdf', //  del archivo adjunto
        //         path: '/ruta/al/archivo/documento.pdf', // Ruta al archivo PDF que deseas adjuntar
        //     },
        // ],
    }

    // Enviar correo electrónico
    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error)
            throw new Error('Error al enviar el correo electrónico: ' + error)
        } else {
            console.log('Correo electrónico enviado:', info.response)
        }
    })
}
