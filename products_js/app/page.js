'use client'

import Link from "next/link";
import { getProductsStore } from "./store/getProductStore";

export default function Home() {

    const { products } = getProductsStore()
    return (
        <main className="mt-[5rem]">
            <div className="max-w-responsive">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                    {
                        products.map((product) =>
                            <Link href={`/pages/${product.id}`} key={product.id} className="bg-black text-white rounded-md px-[20px] py-[20px]">
                                <h2 className="font-bold text-[1.15rem]">{product.name}</h2>
                                <h3 className="text-[0.9rem] font-[500]">{product.brand}</h3>
                                <p className="text-[1.3rem] font-bold">${product.price}</p>
                                <p className="text-[0.8rem]">{product.description}</p>
                            </Link>
                        )
                    }
                </div>
            </div>
        </main>
    );
}
