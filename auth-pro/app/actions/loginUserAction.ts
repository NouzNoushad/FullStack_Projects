import { LoginAuthForm } from "@/interface/interface"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"
import { toast } from "sonner"

export const LoginUserAction = () => {

    const router = useRouter()

    const loginUser = async (authForm: LoginAuthForm) => {
        const result = await signIn('credentials', { redirect: false, ...authForm })

        if (result?.error) {
            throw new Error(result.error)
        }

        return result
    }

    const loginUserMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log(`data: ${data?.ok}`)

            toast.success('login succes')

            router.push('/')
        },
        onError: (error: Error) => {
            console.log(`error: ${error}`)
            toast.error(error.message)
        }
    })

    const onLoginUser = (authForm: LoginAuthForm) => {
        loginUserMutation.mutate(authForm)
    }

    return {
        onLoginUser,
        isLoading: loginUserMutation.isLoading,
    }
}