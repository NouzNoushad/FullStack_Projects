/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import { userValidation } from "../validation"
import { UserFormError } from "@/lib/validationSchema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export const userFormAction = () => {
    const params = useSearchParams()
    const id = params.get('id')

    const [file, setFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<Partial<Record<keyof UserFormError, string[]>>>({})

    const queryClient = useQueryClient()
    const router = useRouter()

    // get user data
    const getUser = async () => {
        const response = await fetch(`/api/users/${id}`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.error)
        }

        const user = data.user
        return user
    }

    const { data: user, error: userError, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: getUser,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!id
    })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
        }
    }

    const userFormMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const endPoint = id ? `/api/users/${id}` : '/api/users'
            const method = id ? 'PUT' : "POST"
            const response = await fetch(endPoint, {
                method,
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
        }
        else if (id && user) {
            console.log(`///// user image: ${user.image}`)
            formData.append('image', user.image)
        }
        else {
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
        user,
        userError,
        isUserLoading
    }
}