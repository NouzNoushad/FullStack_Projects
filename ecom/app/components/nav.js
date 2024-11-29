'use client'

import React from 'react'
import { getCartsAction } from '../action/getCartAction'

export default function Nav() {
    const { carts } = getCartsAction()
    return (
        <nav className="bg-indigo-950 h-[10vh] w-full">
            <div className="max-w-responsive h-full">
                <div className="h-full flex flex-row items-center justify-between">
                    <a href="/" className="text-white text-[1.2rem] font-bold uppercase">Ecom</a>
                    <ul>
                        <li className="relative">
                            <a href="/cart" className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <span
                                    className="absolute top-[-8px] right-[-10px] bg-red-500 rounded-[50%] text-bold text-[0.6rem] min-h-[16px] min-w-[16px] text-center flex items-center justify-center"
                                >{carts.length}</span
                                >
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
