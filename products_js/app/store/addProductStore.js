import { useState } from "react";

export const useProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        brand: "",
        price: "",
        description: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((pre) => ({
            ...pre,
            [name]: value,
        }))
    }

    return {
        product,
        handleChange,
    }
}