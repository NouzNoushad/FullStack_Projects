import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"
import { signupValidation } from "../validation"
import { SignupFormError } from "@/lib/validationSchema"

export const SignupFormAction = () => {
    const [errors, setErrors] = useState<Partial<Record<keyof SignupFormError, string[]>>>()

    const queryClient = useQueryClient()
    const router = useRouter()

    const signupMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('/api/auth/signup/', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to signup')
            }

            const data = await response.json()
            return data
        },
        onSuccess: (data) => {
            console.log(`data: ${data.message}`)

            queryClient.invalidateQueries({
                queryKey: ['auth']
            })

            toast(data.message)

            router.push('/')
        },
        onError: (error) => {
            console.log(`Error: ${error.message}`)
        }
    })

    const handleSignupFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const response = await signupValidation({}, formData)

        if (response?.errors) {
            setErrors(response.errors)
            return
        }

        signupMutation.mutate(formData)
    }

    return {
        handleSignupFormSubmit,
        errors,
        isLoading: signupMutation.isPending,
    }
}