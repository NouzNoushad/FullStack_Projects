'use client'

import { useEffect, useState } from "react";
import { getProductsAction } from "../actions/getProducts";
import { Product } from "../interfaces/productInterface";
import Link from "next/link";

export default function Home() {
    const [products, getProducts] = useState<Product[]>([])

    const fetchProductData = async () => {
        try {
            const productList = await getProductsAction();
            getProducts(productList);
        } catch (error) {
            console.log(`Error fetching data: ${error}`)
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [])
    return (
        <section className="py-[5rem]">
            <div className="max-w-[1200px] mx-auto px-5 xl:px-0">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                    {
                        products.map((product, index) => (
                            <Link href={`/${product._id}`} key={index} className="bg-green-300 rounded-md px-[15px] py-[20px] text-white">
                                <h2 className="text-[1.2rem] font-bold">{product.name}</h2>
                                <h3>{product.brand}</h3>
                                <p className="text-[1.2rem] font-bold text-end mt-2">${product.price}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
