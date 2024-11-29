import React from 'react'
import { addCartAction } from '../action/addCartAction'
import { StarOutline, StarSolid } from '../utils/svgs'

export default function ProductItem({ product }) {

    const { handleAddToCart, isLoading } = addCartAction()
    return (
        <div className="border border-black rounded-md shadow-lg px-5 py-5 flex flex-col cursor-pointer">
            <div className="grow">
                <img src={product.image} alt="" className="min-[400px]:h-[400px] mx-auto sm:h-[200px]" />
                <h2 className="mt-4 text-[1.1rem] font-[500]">{product.title}</h2>
                <h4 className="text-[0.9rem] font-[500] uppercase text-slate-900">{product.category}</h4>
                <p className="text-[1.5rem] font-bold text-red-600">${product.price}</p>
                <div className="flex flex-row items-center gap-[5px]">
                    <div className="flex flex-row">
                        {
                            Array.from({ length: Math.floor(product.rating.rate) }, (_, index) => (
                                <span key={index}>
                                    <StarSolid className="size-5 text-yellow-500" />
                                </span>
                            ))
                        }
                        {
                            Array.from({ length: 6 - Math.ceil(product.rating.rate) }, (_, index) => (
                                <span key={index}>
                                    <StarOutline className="size-5 text-yellow-500" />
                                </span>
                            ))
                        }
                    </div>
                    <span className="text-[0.8rem] text-gray-400">({product.rating.rate})</span>
                </div>
            </div>
            <button
                onClick={() => handleAddToCart(product)}
                className="mt-5 bg-green-500 w-full rounded-md px-2 py-2 text-white font-[500] space-x-3"
            >
                <span>Add To Cart</span>
                <i className="fa-solid fa-cart-shopping mr-2"></i>
            </button>
        </div>
    )
}
