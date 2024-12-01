'use client'

// app/page.tsx
import { useState } from 'react';
import { Item, items } from './data/items';

export default function Home() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const limit = 10;
    const totalPages = Math.ceil(items.length / limit);

    const paginatedItems: Item[] = items.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    );

    return (
        <div className='max-w-[1150px] mx-auto px-5 xl:px-0 py-[3rem]'>
            <div className="space-y-5 h-screen flex flex-col">
                <h1 className='text-center'>Pagination Example with App Router</h1>
                <ul className='grow grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
                    {paginatedItems.map((item) => (
                        <li key={item.id} className='border rounded-md px-3 py-3'>{item.name}</li>
                    ))}
                </ul>

                <div className='flex flex-row items-center justify-center gap-1'>
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
                </div>
            </div>
        </div>
    );
}
