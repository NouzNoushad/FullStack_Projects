'use client'

import React from 'react'
import { getCartsAction } from '../action/getCartAction'
import CartItem from '../components/cartItem'
import { LoadingIndicator } from '../utils/svgs'

export default function Cart() {
    const { carts, isLoading, error } = getCartsAction()

    if (isLoading) return <p className="h-[calc(100vh-10vh)] flex items-center justify-center"><LoadingIndicator className="size-6 text-yellow-600" /></p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <section className="py-[4rem]">
            <div className="max-w-responsive">
                <div className="flex flex-col md:flex-row items-start gap-[20px]">
                    <div className="md:w-2/3 w-full border-2 border-gray-200 px-3 py-5 rounded-md space-y-2">
                        {
                            carts.map((cart, index) => (
                                <CartItem cart={cart} key={index} />
                            ))
                        }
                    </div>
                    <div className="md:w-1/3 w-full border-2 border-gray-200 px-4 py-3 rounded-md h-[200px] flex flex-col">
                        <div className="grow flex flex-col justify-center gap-2">
                            <div className="flex flex-row items-center justify-between">
                                <h2 className="font-[500] text-slate-400">Subtotal</h2>
                                <p className="text-[1rem] text-slate-400 font-[500]">
                                    ${carts.reduce((acc, cart) => acc + cart.price, 0).toFixed(2)}
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <h2 className="font-[500] text-slate-400">Discount</h2>
                                <p className="text-[1rem] text-slate-400 font-[500]">$0</p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <h2 className="font-[600] text-[1.1rem]">Total</h2>
                                <p className="text-[1.25rem] text-red-600 font-[500]">${carts.reduce((acc, cart) => acc + cart.price, 0).toFixed(2)}</p>
                            </div>
                        </div>
                        <button className="mt-5 bg-indigo-950 text-white font-[500] rounded-md px-2 py-2 w-full"
                        >Checkout</button
                        >
                    </div>
                </div>
            </div>
        </section>
    )
}
