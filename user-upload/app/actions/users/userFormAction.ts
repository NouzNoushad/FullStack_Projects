/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import { userValidation } from "../validation"
import { UserFormError } from "@/lib/validationSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const userFormAction = () => {
    const [file, setFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<Partial<Record<keyof UserFormError, string[]>>>({})

    const queryClient = useQueryClient()
    const router = useRouter()

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
        }
    }

    const userFormMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch('/api/users/', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to add user')
            }

            const data = await response.json()
            return data
        },
        onSuccess: (data) => {
            console.log(`data: ${data}`)
            queryClient.invalidateQueries({ queryKey: ['user'] })

            toast(data.message)

            router.push('/')
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
        }
    })

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        console.log(`/////////////////// file: ${file ? file.name : 'not found'}`)

        if (file) {
            formData.append('image', file)
        } else {
            formData.append('image', '')
        }

        const response = await userValidation({}, formData)

        if (response?.errors) {
            setErrors(response?.errors)
            return
        }

        userFormMutation.mutate(formData)
    }

    return {
        handleImageUpload,
        handleFormSubmit,
        file,
        errors,
        isLoading: userFormMutation.isPending,
    }
}