import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const app = express()
export const PORT = process.env.PORT || 1234

// const app = ()=>console.log(port)

// Middleware para procesar solicitudes JSON
app.use(express.json())

// Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
