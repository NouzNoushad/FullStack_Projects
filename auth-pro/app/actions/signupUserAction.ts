/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignAuthForm } from "@/interface/interface"
import { useRouter } from "next/navigation"
import { QueryClient, useMutation } from "react-query"
import { toast } from "sonner"

export const SignupUserAction = () => {

    const queryClient = new QueryClient()
    const router = useRouter()

    const signupUser = async (authForm: SignAuthForm) => {
        const response = await fetch('/api/auth/signup', {
            method: "POST",
            body: JSON.stringify(authForm),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error)
        }

        return data
    }

    const signupUserMutation = useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
            console.log(`data: ${data.message}`)

            queryClient.invalidateQueries({
                queryKey: ['auth']
            })

            toast.success(data.message)

            router.push('/')
        },
        onError: (error: Error) => {
            console.log(`Error: ${error}`)

            toast.error(error.message)
        }
    })

    const onSignupUser = (authForm: SignAuthForm) => {
        console.log(`////////////formdata: ${authForm.name}`)

        signupUserMutation.mutate(authForm)
    }


    return {
        onSignupUser,
        isLoading: signupUserMutation.isLoading
    }
}