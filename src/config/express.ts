import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import router from '../routes'
import path from 'path'

dotenv.config()

export const app = express()
export const PORT = process.env.PORT || 1234

// Middleware para procesar solicitudes JSON
app.use(express.json())

//Router
app.use(router)
// app.use(express.static(path.resolve('src/public')))
app.use(express.static('src/public/views'))
app.use(express.static('src/public'))

// Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
