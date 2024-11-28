'use client'

import { productDetailsStore } from '@/app/store/productDetailsStore'
import React from 'react'

export default function ProductDetails() {
    const { product, loading } = productDetailsStore()

    if (loading) {
        return <h1 className='flex items-center justify-center text-[1rem] font-bold h-[calc(100vh-10vh)]'>Loading</h1>
    }
    return (
        product && <section className='py-[5rem]'>
            <div className="max-w-[500px] mx-auto px-5 xl:px-0">
                <div className="bg-black text-white px-[30px] py-[40px] rounded-md">
                    <h1>{product.name}</h1>
                    <h3>{product.brand}</h3>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <div className="">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
