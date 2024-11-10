import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <nav className='bg-green-300 h-[10vh]'>
        <div className="max-w-[1200px] mx-auto px-5 xl:px-0 h-full">
            <div className="flex flex-row items-center justify-between h-full text-white">
                <h1 className='text-[1.2rem] font-[600] uppercase'>Product Hub</h1>
                <div className="space-x-5">
                    <Link href='/' className='text-[0.9rem] font-bold uppercase'>Home</Link>
                    <Link href='/add' className='bg-white rounded-md px-[20px] py-[10px] text-green-300 uppercase text-[0.9rem] font-bold'>Add Product</Link>
                </div>
            </div>
        </div>
    </nav>
  )
}
