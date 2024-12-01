'use client'

import { handleLoginForm } from '@/app/actions/loginFormAction'
import Link from 'next/link'
import React from 'react'

export default function Login() {

    const { handleLoginSubmit, errors, isLoading } = handleLoginForm()
    return (
        <main className="h-[calc(100vh-10vh)] flex items-center justify-center">
            <div className="w-[400px] mx-auto px-5 xl:px-0">
                <div className="bg-white shadow-lg border px-6 py-10 rounded-lg">
                    <h1 className="text-[1.4rem] text-center font-[500] mb-10">Login</h1>
                    <form onSubmit={handleLoginSubmit} className="space-y-8">
                        <div>
                            <input type="email" name="email" placeholder="Email" className="form-input" />
                            {errors?.email && <p className="form-error">{errors.email}</p>}
                        </div>
                        <div>
                            <input type="text" name="password" placeholder="Password" className="form-input" />
                            {errors?.password && <p className="form-error">{errors.password}</p>}
                        </div>

                        <div className="pt-10">
                            <button type='submit' className="w-full bg-blue-800 text-white font-[500] text-[0.9rem] py-1 rounded-sm">{isLoading ? 'Logging' : 'Login'}</button>
                        </div>
                    </form>
                    <div className="mt-4 flex flex-row items-center justify-center gap-[5px]">
                        <span className="text-[0.8rem] text-gray-400">{"Don't have an account?"}</span>
                        <Link href='/auth/signup' className="underline text-blue-800 text-[0.95rem] font-[500]">Sign up</Link></div>
                </div>
            </div>
        </main>
    )
}
