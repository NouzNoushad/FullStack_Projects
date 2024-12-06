import { signOut } from "next-auth/react"
import { toast } from "sonner"

export const LogoutUserAction = () => {
    const onLogoutUser = () => {
        signOut({
            callbackUrl: '/'
        })

        toast.success('Logout success')
    }
    return {
        onLogoutUser,
    }
}