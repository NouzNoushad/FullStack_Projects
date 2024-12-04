import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const LogoutAction = () => {

    const queryClient = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/auth/logout', {
                method: 'DELETE'
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            return data
        },
        onSuccess: (data) => {
            console.log(`data: ${data.message}`)
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            toast(data.message)

            window.location.reload()
        },
        onError: (error) => {
            console.log(`Error: ${error.message}`)
            toast(error.message)
        }
    })

    return {
        handleLogout: logoutMutation.mutate,
        isLoading: logoutMutation.isPending,
    }
}