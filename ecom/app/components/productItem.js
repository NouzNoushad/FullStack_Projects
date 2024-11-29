import React from 'react'
import { addCartAction } from '../action/addCartAction'

export default function ProductItem({ product }) {

    const { handleAddToCart } = addCartAction()
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-yellow-500">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            ))
                        }
                        {
                            Array.from({ length: 6 - Math.ceil(product.rating.rate) }, (_, index) => (
                                <span key={index}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-yellow-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
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
