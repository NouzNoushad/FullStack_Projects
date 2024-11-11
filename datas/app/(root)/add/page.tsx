/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { addProductAction } from '@/app/actions/addProduct';
import { getProductAction } from '@/app/actions/getProducts';
import { updateProductAction } from '@/app/actions/updateProduct';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function AddProduct() {
    const [name, setName] = useState<string>("");
    const [brand, setBrand] = useState<string | undefined>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string | undefined>("");
    const router = useRouter();
    const searchParam = useSearchParams()
    const id = searchParam.get('id')

    const handleAddProduct = async () => {
        try {
            const productData = { name, brand, price: parseFloat(price) || 0, description };
            if (id) {
                await updateProductAction(id, productData);
            } else {
                await addProductAction(productData);
            }

            setName("")
            setBrand("")
            setPrice("")
            setDescription("")
            router.push('/')

        } catch (error) {
            console.log(`Error adding product: ${error}`)
        }
    }

    const fetchProduct = async () => {
        try {
            if (id) {
                await getProductAction(id).then((product) => {
                    setName(product.name);
                    setBrand(product.brand);
                    setPrice(product.price.toString())
                    setDescription(product.description)
                })
            }
        } catch (error) {
            console.log(`Error fetching product: ${error}`)
        }
    }

    useEffect(() => {
        console.log(id)
        fetchProduct();
    }, [id])
    return (
        <section className='py-[5rem]'>
            <div className="max-w-[600px] mx-auto px-5 xl:px-0">
                <div className="border-4 border-green-300 rounded-md py-10 px-5 bg-green-50 space-y-3">
                    <input type="text" placeholder='Name' className='w-full px-5 py-3 rounded-md border border-green-300 outline-green-300' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Brand' className='w-full px-5 py-3 rounded-md border border-green-300 outline-green-300' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <input type="number" placeholder='Price' className='w-full px-5 py-3 rounded-md border border-green-300 outline-green-300' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <textarea rows={4} placeholder='Description' className='w-full px-5 py-3 rounded-md border border-green-300 outline-green-300' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className="flex md:justify-end justify-center">
                        <button onClick={handleAddProduct} className='border border-green-300 text-green-300 uppercase font-bold text-[0.9rem] px-10 py-3 rounded-md transition-all duration-500 hover:bg-green-300 hover:text-white'>{id ? "Update Product" : "Add Product"}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
