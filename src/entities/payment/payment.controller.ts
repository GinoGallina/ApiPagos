import { Request, Response } from 'express'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { axiosInstance } from '../../utlis/conts'
import { createBody, sendEmail, validateSignature } from './payment.service'
import dotenv from 'dotenv'

dotenv.config()

const paymentController = {
    createOrder: async (req: Request, res: Response) => {
        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADO_PAGO_VENDEDOR_ACCESS_TOKEN!,
            options: { timeout: 5000, idempotencyKey: 'abc' },
        })
        try {
            const preference = new Preference(client)
            const body = createBody()
            const rta = await preference.create({ body })
            // console.log(rta.init_point)
            return res.status(200).json({ id: rta.id })
        } catch (error) {
            console.log(error)

            return res.status(500).json(error)
        }
    },

    webHook: async (req: Request, res: Response) => {
        const body = req.body
        const signature = req.headers['x-signature']
        const id = req.query['data.id']

        console.log(req.query)
        console.log(body)
        console.log(
            '--------------------------------------------------------------------------------',
        )
        const requestId = req.headers['x-request-id']

        if (!signature || Array.isArray(signature)) {
            throw new Error('Error en el x-signature')
        }

        const ts = signature.split(',')[0].split('=')[1]

        // const template = `id:[${id}];request-id:[${requestId}];ts:[${ts}]`
        const template = `id:[${id}];request-id:[${requestId}];ts:[${ts}];`
        // console.log(req.body)
        try {
            const valid = validateSignature(signature, template)

            if (!valid) {
                throw new Error('No viene de MercadoPago')
            }

            if (body.type === 'payment') {
                const pago = await axiosInstance.get(`/payments/${body.data.id}`)
                console.log(pago.data)

                if (pago.data.status == 'rejected') {
                    throw new Error('Pago rechazado')
                }

                if (pago.data.status == 'rejected') {
                    throw new Error('Pago no finalizado, está pendiente')
                }

                if (pago.data.status == 'approved') {
                    sendEmail(pago)
                    return res.status(200).json(pago.data)
                }
                return res.status(200).json(pago.data)
            }
            return res.sendStatus(200)
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
            }
            return res.status(500).json(error)
        }
    },
}

export default paymentController
