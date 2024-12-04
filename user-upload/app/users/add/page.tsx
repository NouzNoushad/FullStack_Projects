'use client'

import { userFormAction } from '@/app/actions/users/userFormAction'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function AddUsers() {
    const { handleImageUpload, handleFormSubmit, file, errors, isLoading } = userFormAction()
    return (
        <main className='py-[5rem]'>
            <div className="max-w-responsive">
                <Card className='w-[400px] mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-center'>User details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="name" className='text-[0.9rem]'>Name</label>
                                    <input type="text" name="name" placeholder='Enter name' className='form-input' />
                                    {errors?.name && <p className="form-error">{errors.name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="email" className='text-[0.9rem]'>Email</label>
                                    <input type="email" name="email" placeholder='Enter email' className='form-input' />
                                    {errors?.email && <p className="form-error">{errors.email}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="phone" className='text-[0.9rem]'>Phone</label>
                                    <input type="tel" name="phone" placeholder='Enter phone number' className='form-input' />
                                    {errors?.phone && Array.isArray(errors.phone) && (
                                        <div className="form-error">
                                            {errors.phone.map((error, index) => (
                                                <p key={index}>{error}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="profession" className='text-[0.9rem]'>Profession <span className='text-[0.8rem]'>(optional)</span></label>
                                    <input type="text" name="profession" placeholder='Enter profession' className='form-input' />
                                    {errors?.profession && <p className="form-error">{errors.profession}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="image" className='text-[0.9rem]'>Image <span className='text-[0.8rem]'>(optional)</span></label>
                                    <div className="flex flex-row items-center justify-between form-input">
                                        <h4 className={file ? 'text-black' : `text-gray-400`}>{file ? file.name : 'Upload image'}</h4>
                                        <label>
                                            <span className=' bg-slate-800 px-5 py-2 text-white rounded-md text-[0.9rem] cursor-pointer'>Upload</span>
                                            <input type="file" id='name' onChange={handleImageUpload} accept="image/*" className='hidden' />
                                        </label>
                                    </div>
                                    {errors?.image && <p className="form-error">{errors.image}</p>}
                                </div>
                                <Button type='submit' className='mt-5 uppercase bg-slate-800'>
                                    <span>
                                        {isLoading ? <Loader2 className='animate-spin' /> : null}
                                    </span>
                                    {isLoading ? 'Adding' : 'Add User'}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
