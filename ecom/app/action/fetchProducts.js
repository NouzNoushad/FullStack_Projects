import { useQuery } from "@tanstack/react-query"

export const getProductsAction = () => {

    const fetchProducts = async () => {
        const url = "https://fakestoreapi.com/products"
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        console.log(`/////////// data: ${data.length}`)
        return data;
    }

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })

    return {
        products,
        isLoading,
        error,
    }
}