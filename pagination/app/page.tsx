'use client'

// app/page.tsx
import { useState } from 'react';
import { Item, items } from './data/items';

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 10;
    const totalPages = Math.ceil(items.length / limit);

    const paginatedItems: Item[] = items.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='max-w-[1150px] mx-auto px-5 xl:px-0 py-[3rem]'>
            <div className="space-y-5 h-screen flex flex-col">
                <h1 className='text-center'>Pagination Example with App Router</h1>
                <ul className='grow grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
                    {paginatedItems.map((item) => (
                        <li key={item.id} className='border rounded-md px-3 py-3'>{item.name}</li>
                    ))}
                </ul>

                <div className="p-6 flex flex-row items-center justify-center">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>

                {/* <div className='flex flex-row items-center justify-center gap-1'>
                    <button
                        disabled={currentPage === 1}
                        className='rounded-md border px-5 py-2 min-w-[8rem] mr-1'
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={((currentPage == index + 1) ? 'bg-blue-600 text-white h-[40px] w-[40px] rounded-md' : 'bg-white text-black h-[40px] w-[40px] rounded-md')}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        className='rounded-md border px-5 py-2 min-w-[8rem] ml-1'
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </div>
    );
}


interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const getPaginationRange = () => {
        const range = [];

        // Add the "First Page" button
        if (currentPage > 2) {
            range.push(1);
            if (currentPage > 3) {
                range.push("...");
            }
        }

        // Add the current page and surrounding pages
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Add the "Last Page" button
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                range.push("...");
            }
            range.push(totalPages);
        }

        return range;
    };

    const handlePageChange = (page: number | string) => {
        if (typeof page === "number") {
            onPageChange(page);
        }
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
                    }`}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Pagination Numbers */}
            {paginationRange.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page
                        ? "bg-blue-500 text-white"
                        : page === "..."
                            ? "cursor-default text-gray-500"
                            : "hover:bg-gray-200"
                        }`}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
                    }`}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};
