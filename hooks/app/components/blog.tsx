'use client'

import React from 'react'
import { BlogPosts } from '../interface/interface'

export default function BlogPostsPage({posts}: {posts: BlogPosts[]}) {
  return (
      <ul>
          {
              posts.map((post: BlogPosts) => (
                  <li key={post.id} className="">
                      <h2 className='font-bold text-[1.2rem] text-blue-700'>{post.title}</h2>
                      <p>{post.body}</p>
                  </li>
              ))
          }
      </ul>
  )
}
