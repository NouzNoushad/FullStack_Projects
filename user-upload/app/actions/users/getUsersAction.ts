/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { User } from "@/app/interface/userInterface"
import { useEffect, useMemo, useState } from "react"
import { LIMIT } from "@/lib/constants"
import { toast } from "sonner"
import { debounce } from "lodash"

export const getUsersAction = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredItems, setFilteredItems] = useState<User[]>([])

    const queryClient = useQueryClient()

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleSearchQuery = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)
    }

    const setPaginatedItems = (users: User[]) => {
        const totalPagesLimit = Math.ceil(users.length / LIMIT)
        setTotalPages(totalPagesLimit)

        const paginatedItems: User[] = users.slice(
            (currentPage - 1) * LIMIT,
            currentPage * LIMIT
        )
        return paginatedItems
    }

    // fetch users
    const fetchUsers = async (): Promise<User[]> => {
        const response = await fetch('/api/users/')
        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        console.log(`data: ${data.users}`)

        return data.users
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

    const handleFilter = useMemo(
        () => debounce((users: User[]) => {
            const filtered = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

            const items = setPaginatedItems(filtered)
            setFilteredItems(items)
        }, 300),
        [searchQuery, currentPage]
    )

    useEffect(() => {
        handleFilter(paginatedItems)
    }, [searchQuery, currentPage, paginatedItems])

    return {
        filteredItems,
        isLoading,
        error,
        handlePageChange,
        currentPage,
        totalPages,
        deleteId,
        handleDeleteUser: deleteUser.mutate,
        isDeleting: deleteUser.isPending,
        handleSearchQuery,
        searchQuery,
        setSearchQuery,
    }
}