import { useRouter } from "next/navigation";
import { useState } from "react";

export const useProductForm = () => {
    const router = useRouter()
    const [product, setProduct] = useState({
        name: "",
        brand: "",
        price: 0.0,
        description: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((pre) => ({
            ...pre,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product })
            })
            if (!response.ok) {
                throw new Error('Failed to add product')
            }
            const data = await response.json()
            console.log(data)
            setProduct({
                name: "",
                brand: "",
                price: 0.0,
                description: ""
            })
            router.push('/')
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    return {
        product,
        handleChange,
        handleFormSubmit,
    }
}