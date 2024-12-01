/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { FormError } from "../lib/validations";
import { signup } from "./auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const handleSignUpForm = () => {
    const [errors, setErrors] = useState<Partial<Record<keyof FormError, string[]>>>({})

    const queryClient = useQueryClient()
    const router = useRouter()

    const signUpUserMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('/api/auth/signup/', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Sign up failed')
            }
            const data = await response.json()
            return data
        },
        onSuccess: (data) => {
            console.log(`response data: ${data}`)
            queryClient.invalidateQueries({ queryKey: ['auth'] })

            router.push('/auth/login')
        },
        onError: (error) => {
            console.log(`Sign up error: ${error.message}`)
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const response = await signup({}, formData)

        if (response?.errors) {
            setErrors(response.errors)
        }

        // sign up user
        signUpUserMutation.mutate(formData)
    }

    return {
        handleSubmit,
        errors,
        isLoading: signUpUserMutation.isPending
    }
}