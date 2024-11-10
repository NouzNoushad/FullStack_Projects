import React from 'react'

export default async function UsersProfile({ params }: { params: { id: string } }) {
    const { id } = await params
    return (
        <div className='text-3xl'>User Profile: {id}</div>
    )
}
