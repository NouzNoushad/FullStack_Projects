'use client'

import axios from "axios";
import React, { useState } from "react"

interface ProductState {
    image: File | null;
}

export default function AddProduct() {
    const initialProductState: ProductState = {
        image: null as File | null,
    }

    const [product, setProduct] = useState<ProductState>(initialProductState);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                image: file,
            }));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if (product.image) {
            formData.append('image', product.image);
        }

        const response = await axios.post('/api/products', formData);
        console.log(response.data);
        console.log(response.status);
    }
    return (
        <section className='py-[5rem]'>
            <div className="max-w-[600px] mx-auto px-5 xl:px-0">
                <form onSubmit={handleSubmit} className="border-4 border-blue-800 rounded-md py-10 px-5 bg-blue-50 space-y-3">
                    <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
                    <div className="flex md:justify-end justify-center">
                        <button type="submit" className='border border-blue-800 text-blue-800 uppercase font-bold text-[0.9rem] px-10 py-3 rounded-md transition-all duration-500 hover:bg-blue-800 hover:text-white'>{"Add Product"}</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
