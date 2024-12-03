export interface Image {
    publicId: string
    secureUrl: string
}

export interface User {
    id: string
    name: string
    email: string
    phone: string
    profession: string
    image: Image
}

export interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}