import { Router } from 'express'
import paymentController from './payment.controller'

const paymentRouter = Router()

paymentRouter.post('/create_order', paymentController.createOrder)
paymentRouter.post('/webhook', paymentController.webHook)
export default paymentRouter
