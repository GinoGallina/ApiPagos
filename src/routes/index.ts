import { Router } from 'express'
import paymentRouter from '../entities/payment/payment.route'

const router = Router()

router.use('/payments', paymentRouter)

export default router
