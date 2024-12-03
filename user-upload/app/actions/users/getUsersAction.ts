/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { User } from "@/app/interface/userInterface"
import { useState } from "react"
import { paginationLimit } from "@/lib/constants"
import { toast } from "sonner"

export const getUsersAction = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    // fetch users
    const fetchUsers = async (): Promise<User[]> => {
        const response = await fetch('/api/users/')
        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        console.log(`data: ${data.users}`)

        const totalPagesLimit = Math.ceil(data.users.length / paginationLimit)
        setTotalPages(totalPagesLimit)

        const paginatedItems: User[] = data.users.slice(
            (currentPage - 1) * paginationLimit,
            currentPage * paginationLimit
        )

        return paginatedItems
    }

    const { data: paginatedItems = [], isLoading, error } = useQuery({
        queryKey: ['user', currentPage],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })

    // delete user
    const deleteUser = useMutation({
        mutationFn: async (id: string) => {
            setDeleteId(id)
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete user')
            }

            const data = await response.json()
            return data
        },
        onSuccess: (data) => {
            console.log(`delete data: ${data.message}`)
            queryClient.invalidateQueries({
                queryKey: ['user']
            })

            toast(data.message)
        },
        onError: (error) => {
            console.log(`Error: ${error.message}`)
        }
    })

    return {
        paginatedItems,
        isLoading,
        error,
        handlePageChange,
        currentPage,
        totalPages,
        deleteId,
        handleDeleteUser: deleteUser.mutate,
        isDeleting: deleteUser.isPending
    }
}