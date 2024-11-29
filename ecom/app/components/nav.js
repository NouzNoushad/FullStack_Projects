'use client'

import React from 'react'
import { getCartsAction } from '../action/getCartAction'
import { CartIcon, LoadingIndicator } from '../utils/svgs'

export default function Nav() {
    const { carts, isLoading, error } = getCartsAction()

    return (
        <nav className="bg-indigo-950 h-[10vh] w-full">
            <div className="max-w-responsive h-full">
                <div className="h-full flex flex-row items-center justify-between">
                    <a href="/" className="text-white text-[1.2rem] font-bold uppercase">Ecom</a>
                    <ul>
                        <li className="relative">
                            <a href="/cart" className="text-white">
                                <CartIcon className="size-6" />
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
