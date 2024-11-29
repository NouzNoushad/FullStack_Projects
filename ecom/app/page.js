'use client'

import { getProductsAction } from "./action/fetchProducts";
import ProductItem from "./components/productItem";

export default function Home() {

    const { products, loading } = getProductsAction()

    if (loading) {
        <div className="text-black flex items-center justify-center text-[2rem]">
            Loading...
        </div>
    }

    return (
        <main className="py-[3rem]">
            <div className="max-w-responsive">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[10px]">
                    {
                        products.map((product, index) =>
                            <ProductItem product={product} key={index} />
                        )
                    }
                </div>
            </div>
        </main>
    );
}
