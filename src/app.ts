import { app, PORT } from './config/express'

console.clear()

// Iniciar el servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//Maneja errores del servidor
server.on('error', (error: any) => {
    console.error('Error al iniciar el servidor: ', error)
})
