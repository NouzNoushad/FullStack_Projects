import { useEffect, useState } from "react"

export const getProductsAction = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const url = "https://fakestoreapi.com/products"
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }
            const data = await response.json()
            console.log(`/////////// data: ${data.length}`)
            setProducts(data)
        } catch (error) {
            console.error(`Error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return {
        products,
        loading,
    }
}