import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Login() {
    return (
        <main className='py-[5rem]'>
            <div className="max-w-responsive">
                <Card className='w-[400px] mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-center'>Login</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-8">
                        <form className="space-y-2">
                            <div>
                                <input type="email" name="email" placeholder="Email" className="form-input" />
                            </div>
                            <div>
                                <input type="text" name="password" placeholder="Password" className="form-input" />
                            </div>
                            <div className="pt-10">
                                <button type="submit" className="w-full bg-slate-800 text-white font-[500] text-[0.9rem] py-2 rounded-sm flex flex-row items-center justify-center gap-[10px]">{'Login'}</button>
                            </div>
                        </form>
                        <div className="mt-4 flex flex-row items-center justify-center gap-[5px]">
                            <span className="text-[0.8rem] text-gray-400">{"Don't have an account?"}</span>
                            <Link href='/signup' className="underline text-slate-800 text-[0.95rem] font-[500]">Sign up</Link></div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

