/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query"
import { User } from "@/app/interface/userInterface"

export const getUsersAction = () => {

    // fetch users
    const fetchUsers = async () : Promise<User[]> => {
        const response = await fetch('/api/users/')
        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        console.log(`data: ${data.users}`)
        return data.users
    }

    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })

    return {
        users,
        isLoading,
        error
    }
}