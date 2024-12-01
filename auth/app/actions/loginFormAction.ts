/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { login } from "./auth"
import { LoginFormError } from "../lib/validations"
import { useRouter } from "next/navigation"

export const handleLoginForm = () => {
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormError, string[]>>>()

    const queryClient = useQueryClient()
    const router = useRouter()

    const loginUserMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error('Failed to login')
            }

            const data = await response.json()
            return data
        },
        onSuccess: (data) => {
            console.log(`data: ${data}`)
            queryClient.invalidateQueries({ queryKey: ['auth'] })

            router.push('/')
        },
        onError: (error) => {
            console.log(`Login error: ${error.message}`)
        }
    })

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const response = await login({}, formData)

        if (response?.errors) {
            setErrors(response?.errors)
        }

        loginUserMutation.mutate(formData)
    }

    return {
        handleLoginSubmit,
        errors,
        isLoading: loginUserMutation.isPending,
    }
}