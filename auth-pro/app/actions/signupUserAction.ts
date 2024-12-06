/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthForm } from "@/interface/interface"
import { QueryClient, useMutation } from "react-query"

export const SignupUserAction = () => {

    const queryClient = new QueryClient()

    const signupUser = async (authForm: AuthForm) => {
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
        },
        onError: (error) => {
            console.log(`Error: ${error}`)
        }
    })

    const onSignupUser = (authForm: AuthForm) => {
        console.log(`////////////formdata: ${authForm.name}`)

        signupUserMutation.mutate(authForm)
    }


    return {
        onSignupUser,
        isLoading: signupUserMutation.isLoading
    }
}