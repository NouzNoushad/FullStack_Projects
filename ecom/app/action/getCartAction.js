import { useEffect, useState } from "react"

export const getCartsAction = () => {
    const [carts, setCarts] = useState([])

    const getCarts = async () => {
        try {
            const response = await fetch('/api/cart')
            if (!response.ok) {
                throw new Error('Failed to fetch carts')
            }
            const data = await response.json()
            console.log(data.carts)
            setCarts(data.carts)
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    useEffect(() => {
        getCarts()
    }, [])

    return {
        carts,
    }
}