import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function AddUsers() {
    return (
        <main className='py-[5rem]'>
            <div className="max-w-responsive">
                <Card className='w-[400px] mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-center'>User details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action="">
                            <div className="grid w-full items-center gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="name" className='text-[0.9rem]'>Name</label>
                                    <input type="text" name="name" placeholder='Enter name' className='form-input' />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="email" className='text-[0.9rem]'>Email</label>
                                    <input type="email" name="email" placeholder='Enter email' className='form-input' />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="phone" className='text-[0.9rem]'>Phone</label>
                                    <input type="number" name="phone" placeholder='Enter phone number' className='form-input' />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="profession" className='text-[0.9rem]'>Profession</label>
                                    <input type="text" name="profession" placeholder='Enter profession' className='form-input' />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="image" className='text-[0.9rem]'>Image</label>
                                    <div className="flex flex-row items-center justify-between form-input">
                                        <h4 className='text-gray-400'>Upload image</h4>
                                        <button className='bg-black px-5 py-1 text-white rounded-md text-[0.9rem]'>Upload</button>
                                    </div>
                                </div>
                                <Button className='mt-5 uppercase'>Add User</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
