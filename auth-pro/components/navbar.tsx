'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {

    const { data: session } = useSession()

    return (
        <nav className='h-[10vh] bg-black w-full py-2'>
            <div className="max-w-responsive h-full">
                <div className="flex flex-row items-center justify-between h-full">
                    <Link href="/" className='text-white font-bold uppercase'>NextAuth</Link>
                    <div className="space-x-2">
                        {
                            (session) ? <Link href='/login' className='bg-white rounded-md px-5 py-2 text-black'>Logout</Link> : <Link href='/login' className='bg-white rounded-md px-5 py-2 text-black'>Login</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}