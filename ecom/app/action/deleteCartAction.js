import { useMutation, useQueryClient } from "@tanstack/react-query"

export const deleteCartAction = () => {
    const queryClient = useQueryClient()

    const handleCartDelete = useMutation({
        mutationFn: async (id) => {
            const response = await fetch(`/api/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete cart')
            }
            const data = await response.json()
            console.log(data.message)
            return data
        },
        onSuccess: (data) => {
            console.log(data.message)
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            console.error('Error deleting cart:', error)
        }
    })

    return {
        handleDeleteCart: handleCartDelete.mutate,
        isLoading: handleCartDelete.isLoading,
    }
}