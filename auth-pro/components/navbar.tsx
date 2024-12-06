'use client'

import { LogoutUserAction } from '@/app/actions/logoutUserAction'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {

    const { data: session } = useSession()
    const { onLogoutUser } = LogoutUserAction()

    return (
        <nav className='h-[10vh] bg-black w-full py-2'>
            <div className="max-w-responsive h-full">
                <div className="flex flex-row items-center justify-between h-full">
                    <Link href="/" className='text-white font-bold uppercase'>NextAuth</Link>
                    <div className="flex flex-row items-center gap-[10px]">
                        <div className="space-x-2">
                            {
                                (session) ? <button onClick={onLogoutUser} className='bg-white rounded-md px-5 py-1 text-black'>Logout</button> : <Link href='/login' className='bg-white rounded-md px-5 py-2 text-black'>Login</Link>
                            }
                        </div>{
                            (session) ? <div className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center font-bold">{
                                session?.user?.name?.substring(0, 1).toUpperCase()
                            }</div> : null
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}