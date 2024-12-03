import { PaginationProps } from "@/app/interface/userInterface";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

export const PaginationComponent: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

    const getPaginationRange = () => {
        const range = []

        // first page
        if (currentPage > 2) {
            range.push(1)
            if (currentPage > 3) {
                range.push('...')
            }
        }

        // current page
        const start = Math.max(1, currentPage - 1)
        const end = Math.min(totalPages, currentPage + 1)

        for (let i = start; i <= end; i++) {
            range.push(i)
        }

        // last page
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                range.push('...')
            }
            range.push(totalPages)
        }

        return range
    }

    const handlePageChange = (page: number | string) => {
        if (typeof page === "number") {
            onPageChange(page)
        }
    }

    const paginationRange = getPaginationRange()

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} />
                </PaginationItem>

                {
                    paginationRange.map((page, index) => (
                        <PaginationItem key={index} className="cursor-pointer">
                            {
                                page === '...' ? <PaginationEllipsis /> : <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>{page}</PaginationLink>
                            }
                        </PaginationItem>
                    ))
                }

                <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}