'use client'

import { deleteProductAction } from '@/app/actions/deleteProduct'
import { getProductAction } from '@/app/actions/getProducts'
import { Product } from '@/app/interfaces/productInterface'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProductDetails() {
    const pathName = usePathname()
    const router = useRouter()
    const [product, setProduct] = useState<Product | undefined>()

    const fetchProduct = async () => {
        try {
            const productDetails = await getProductAction(pathName);
            setProduct(productDetails)
        } catch (error) {
            console.log(`Error fetching product: ${error}`)
        }
    }

    const handleDeleteProduct = async () => {
        try {
            const result = await deleteProductAction(pathName);
            console.log(result);
            router.push('/')
        } catch (error) {
            console.log(`Error deleting product: ${error}`)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [pathName])
    return (
        <section className='py-[5rem]'>
            {
                product ? <div className="max-w-[600px] mx-auto px-5 xl:px-0">
                    <div className="px-6 py-8 border-4 border-green-300 bg-green-50 rounded-md">
                        <div className="bg-green-300 text-white px-4 py-4 rounded-md">
                            <h2 className='text-[1.5rem] font-bold'>{product.name}</h2>
                            <h3 className='text-[1.2rem] font-[500]'>{product.brand}</h3>
                            <p className='text-[1.5rem] text-bold'>${product.price}</p>
                            <p>{product.description}</p>
                        </div>
                        <div className="pt-4 flex flex-row items-center justify-center md:justify-end gap-[10px]">
                            <Link href={`/add?id=${product._id}`} className='border-2 border-blue-500 rounded-md px-[30px] py-1 bg-blue-50 text-blue-500 uppercase text-[0.9rem] transition-all duration-300 hover:bg-blue-500 hover:text-white'>Edit</Link>
                            <button onClick={handleDeleteProduct} className='border-2 border-red-500 rounded-md px-[30px] py-1 bg-red-50 text-red-500 uppercase text-[0.9rem] transition-all duration-300 hover:bg-red-500 hover:text-white'>Delete</button>
                        </div>
                    </div>
                </div> : null
            }
        </section>
    )
}
