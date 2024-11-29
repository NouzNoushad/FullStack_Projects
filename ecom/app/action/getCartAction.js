import { useQuery } from "@tanstack/react-query"

export const getCartsAction = () => {

    const getCarts = async () => {
        const response = await fetch('/api/cart')
        if (!response.ok) {
            throw new Error('Failed to fetch carts')
        }
        const data = await response.json()
        console.log(data.carts)
        return data.carts
    }

    const { data: carts = [], isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCarts,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })

    return {
        carts,
        isLoading,
        error,
    }
}