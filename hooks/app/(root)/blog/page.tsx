import BlogPostsPage from '@/app/components/blog'
import React from 'react'

export default async function Blog() {
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
    const response = await fetch(url, { cache: 'no-store' })
    const posts = await response.json()

    return (
        <div className='h-auto text-black'>
            <aside className='w-1/4 bg-blue-200 py-5 px-5 h-screen left-0 top-0 fixed'>
                <p>Left Side</p>
            </aside>

            <main className='w-[calc(100%-50%)] ml-[25%] mr-[25%] bg-green-200 overflow-y-auto hide-scrollbar py-5 px-5'>
                <h1 className='text-center font-bold text-[1.2rem] text-black'>Posts</h1>
                <BlogPostsPage posts={posts} />
            </main>

            <aside className='w-1/4 bg-red-200 py-5 px-5 h-screen right-0 top-0 fixed'>
                <p>Right Side</p>
            </aside>
        </div>
    )
}

