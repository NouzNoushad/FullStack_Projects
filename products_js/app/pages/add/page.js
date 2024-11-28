'use client'

import { useProductForm } from '@/app/store/addProductStore'
import React from 'react'

export default function addPage() {
    
    const {product, handleChange } = useProductForm()

    return (
        <section>
            <div className="max-w-[600px] mx-auto px-5 xl:px-0 my-[5rem]">
                <form className="bg-black rounded-md px-[20px] py-[40px] space-y-[15px]">
                    <input type="text" placeholder="Enter product name" className="input-bg" value={product.name} name='name' onChange={handleChange} />
                    <input type="text" placeholder="Enter product brand" className="input-bg" value={product.brand} name='brand' onChange={handleChange} />
                    <input type="number" placeholder="Enter product price" className="input-bg" value={product.price} name='price' onChange={handleChange} />
                    <textarea rows={4} placeholder="Enter product description" className="input-bg" value={product.description} name='description' onChange={handleChange}></textarea>
                    <div className="flex justify-center sm:justify-end">
                        <button type="submit" className="border border-white rounded-md px-[15px] py-[5px] text-white font-[500] text-[0.9rem] transition-all duration-300 hover:text-black hover:border-white hover:bg-white">Create Product</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
