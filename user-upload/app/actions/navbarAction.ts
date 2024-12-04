import { useQuery } from "@tanstack/react-query"

export const NavbarAction = () => {

    const fetchCookies = async () => {
        const response = await fetch('/api/auth/cookie')

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error)
        }

        console.log(`data: ${data.email}`)
        return data.email
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['cookie'],
        queryFn: fetchCookies,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
    })

    return {
        isLoggedIn: data,
        error,
        isLoading,
    }
}