import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { loginValidation } from "../validation"
import { useState } from "react"
import { LoginFormError } from "@/lib/validationSchema"

export const LoginFormAction = () => {

    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormError, string[]>>>({})

    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('/api/auth/login/', {
                method: 'POST',
                body: formData,
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
            window.location.replace('/')
        },
        onError: (error) => {
            console.log(`Error: ${error.message}`)
            toast(error.message)
        }
    })

    const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const response = await loginValidation({}, formData)

        if (response?.errors) {
            setErrors(response.errors)
            return
        }

        loginMutation.mutate(formData)
    }

    return {
        handleLoginFormSubmit,
        errors,
        isLoading: loginMutation.isPending,
    }
}