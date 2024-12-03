/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query"
import { User } from "@/app/interface/userInterface"
import { useState } from "react"

export const getUsersAction = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 4

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    // fetch users
    const fetchUsers = async () : Promise<{users: User[], paginatedItems: User[]}> => {
        const response = await fetch('/api/users/')
        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        console.log(`data: ${data.users}`)

        const totalPagesLimit = Math.ceil(data.users.length / limit)
        setTotalPages(totalPagesLimit)

        const paginatedItems: User[] = data.users.slice(
            (currentPage - 1) * limit,
            currentPage * limit
        )
        
        return {
            users: data.users,
            paginatedItems,
        }
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['user', currentPage],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })

    return {
        users: data?.users,
        paginatedItems: data?.paginatedItems,
        isLoading,
        error,
        handlePageChange,
        currentPage,
        totalPages,
    }
}