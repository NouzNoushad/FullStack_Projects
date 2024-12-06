'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validationSchema';
import { LoginUserAction } from '@/app/actions/loginUserAction';
import { Loader2 } from 'lucide-react';

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const { onLoginUser, isLoading } = LoginUserAction()

    return (
        <main className='py-[5rem]'>
            <div className="max-w-responsive">
                <Card className='w-[400px] mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-center'>Login</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-8">
                        <form onSubmit={handleSubmit(onLoginUser)} className="space-y-2">
                            <div>
                                <input type="email" placeholder="Email" className="form-input" {...register('email')} />
                                <p className='form-error'>{errors.email?.message}</p>
                            </div>
                            <div>
                                <input type="text" placeholder="Password" className="form-input" {...register('password')} />
                                <p className='form-error'>{errors.password?.message}</p>
                            </div>
                            <div className="pt-10">
                                <button type="submit" className="w-full bg-slate-800 text-white font-[500] text-[0.9rem] py-2 rounded-sm flex flex-row items-center justify-center gap-[10px]">{
                                    isLoading ? <div className='flex flex-row items-center gap-[10px]'>
                                        <Loader2 className="animate-spin" />
                                        <span>Loging in</span>
                                    </div> : 'Login'
                                }</button>
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

