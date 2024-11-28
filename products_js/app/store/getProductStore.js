import { useEffect, useState } from "react"

export const getProductsStore = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }
            const data = await response.json();
            console.log(`data: ${data.products[0].name}`)
            setProducts(data.products)
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return {
        products,
    }
}