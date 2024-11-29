'use client'

import { getProductsAction } from "./action/fetchProducts";
import ProductItem from "./components/productItem";
import { LoadingIndicator } from "./utils/svgs";

export default function Home() {

    const { products, isLoading, error } = getProductsAction()

    if (isLoading) return <p className="h-[calc(100vh-10vh)] flex items-center justify-center"><LoadingIndicator className="size-6 text-yellow-600" /></p>
    if (error) return <p>Error: {error.message}</p>

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
