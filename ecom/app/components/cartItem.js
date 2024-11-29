import React from 'react'
import { DeleteIcon, StarSolid, StarOutline } from '../utils/svgs'

export default function CartItem({ cart }) {
    return (
        <div
            className="border-2 border-gray-200 px-4 py-4 rounded-md flex flex-col md:flex-row justify-center items-center gap-[20px]"
        >
            <img src={cart.image} alt="" className="w-[100px] h-[100px]" />
            <div className="flex flex-col items-start justify-center grow">
                <h2 className="text-[1rem] font-[500]">{cart.title}</h2>
                <h3 className="uppercase text-[0.9rem] font-[500] text-slate-900">{cart.category}</h3>
                <div className="flex flex-row items-center gap-[5px]">
                    <div className="flex flex-row text-[0.8rem]">
                        {
                            Array.from({ length: Math.floor(cart.rating) }, (_, index) => (
                                <span key={index}>
                                    <StarSolid className="size-4 text-yellow-500" />
                                </span>
                            ))
                        }
                        {
                            Array.from({ length: 6 - Math.ceil(cart.rating) }, (_, index) => (
                                <span key={index}>
                                    <StarOutline className="size-4 text-yellow-500" />
                                </span>
                            ))
                        }
                    </div>
                    <span className="text-[0.8rem] text-gray-400">({cart.rating})</span>
                </div>
                <p className="text-[1.2rem] font-bold text-red-600">${cart.price}</p>
            </div>
            <button
                aria-label="delete"
                className="bg-slate-100 rounded-[50%] h-[40px] w-[40px] text-indigo-950 flex items-center justify-center"
            >
                <DeleteIcon className="size-5" />
            </button
            >
        </div>
    )
}
