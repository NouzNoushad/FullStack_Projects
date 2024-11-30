import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <nav className='bg-blue-800 h-[10vh]'>
            <div className="max-w-[1200px] mx-auto px-5 xl:px-0 h-full">
                <div className="flex flex-row items-center justify-between h-full text-white">
                    <Link href="/" className='text-[1.2rem] font-[600] uppercase'>Auth</Link>
                    <div className="space-x-5">
                        <Link href='/auth/login' className='bg-white rounded-md px-[20px] py-[10px] text-blue-800 uppercase text-[0.9rem] font-bold'>Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}