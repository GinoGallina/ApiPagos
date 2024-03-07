/* eslint-disable no-undef */
const fetchApiMercado = async () => {
    try {
        const response = await fetch('http://localhost:3000/payments/create_order', {
            method: 'POST',
        })
        if (!response.ok) return
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}
const btnSend = document.getElementById('btn-send')
btnSend.addEventListener('click', async () => {
    const data = await fetchApiMercado()
    console.log(data)
    const divComprar = document.getElementById('wallet_container')
    divComprar.removeChild(btnSend)
    const mp = new MercadoPago('TEST-191fbea0-9e5b-42c6-afd5-ebc2648ac838', { locale: 'es-AR' })
    // const bricksBuilder = mp.bricks()

    const walltet = await mp.bricks().create('wallet', 'wallet_container', {
        initialization: {
            preferenceId: data.id,
        },
        customization: {
            texts: {
                valueProp: 'smart_option',
            },
        },
    })
    console.log(walltet.target)
})
