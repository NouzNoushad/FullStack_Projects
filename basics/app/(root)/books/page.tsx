"use client"
import { addBookAction } from '@/app/actions/addBookAction';
import { fetchBookAction } from '@/app/actions/fetchBookAction';
import { Book } from '@/app/interfaces/bookInterface';
import React, { useEffect, useState } from 'react'

export default function Books() {
    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([])

    const fetchData = async () => {
        try {
            const books = await fetchBookAction()
            setBooks(books)
        } catch (error) {
            console.log(`Error fetching book: ${error}`)
        }
    }

    const handleClick = async () => {
        try {
            await addBookAction({ id, name })
            setId("")
            setName("")
            await fetchData()
        } catch (error) {
            console.log(`Error adding book: ${error}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <main className='grid md:grid-cols-2 grid-cols-1 gap-[30px]'>
            <div className="py-[5rem]">
                <div className="flex flex-col items-center gap-[20px]">
                    <input type="text" placeholder='Book ID' className='w-[50%] py-[10px] px-[10px] rounded-md outline-black text-black' value={id} onChange={(e) => setId(e.target.value)} />
                    <input type="text" placeholder='Book Name' className='w-[50%] py-[10px] px-[10px] rounded-md outline-black text-black' value={name} onChange={(e) => setName(e.target.value)} />
                    <button onClick={handleClick} className='border border-white rounded-md px-[15px] py-[10px] transition-all duration-300 hover:bg-white hover:text-black'>Add Book</button>
                </div>
            </div>
            <div className="px-5 overflow-y-auto">
                <h1 className='text-xl font-bold'>Book Results:</h1>
                <ul className='mt-5 space-y-3'>
                    {
                        books.map((book) => (
                            <li key={book.id} className='border border-white rounded-md px-[15px] py-[10px] flex flex-row items-center justify-between gap-[10px]'>
                                <h3 className='mr-5'>{book.id}</h3>
                                <h4 className='grow font-[500]'>{book.name}</h4>
                                <div className="space-x-3">
                                    <button className='text-[0.9rem] border border-blue-500 rounded-md px-[10px] py-[5px] text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white'>Update</button>
                                    <button className='text-[0.9rem] border border-red-500 rounded-md px-[10px] py-[5px] text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white'>Delete</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </main>
    )
}
