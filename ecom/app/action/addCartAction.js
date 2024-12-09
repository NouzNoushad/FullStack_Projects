import { useMutation, useQueryClient } from "@tanstack/react-query"

export const addCartAction = () => {
    const queryClient = useQueryClient()

    const handleCartAddMutation = useMutation({
        mutationFn: async (product) => {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if (!response.ok) {
                throw new Error('Failed to add cart')
            }
            const data = await response.json()
            console.log(`data: ${data.message}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data.message)
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            console.log(`Error adding cart: ${error}`)
        }
    })

    return {
        handleAddToCart: handleCartAddMutation.mutate,
        isLoading: handleCartAddMutation.isLoading,
    }
}