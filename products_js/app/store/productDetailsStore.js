import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"

export const productDetailsStore = () => {
    const pathName = usePathname();
    const id = pathName.split('/').at(-1);

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        if (!id) return

        setLoading(true)

        try {
            const response = await fetch(`/api/products/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch product')
            }
            const data = await response.json()
            console.log(data.product)
            const { name, brand, price, description } = data.product;
            setProduct({
                name,
                brand,
                price,
                description
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [id])

    return {
        product,
        loading,
    }
}