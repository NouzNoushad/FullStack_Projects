import Link from 'next/link'
import React from 'react'

export default function Users() {
    return (
        <div>
            <u>
                <li><Link href="/dashboard/users/1">User 1</Link></li>
                <li><Link href="/dashboard/users/2">User 2</Link></li>
                <li><Link href="/dashboard/users/3">User 3</Link></li>
                <li><Link href="/dashboard/users/4">User 4</Link></li>
                <li><Link href="/dashboard/users/5">User 5</Link></li>
                <li><Link href="/dashboard/users/6">User 6</Link></li>
            </u>
        </div>
    )
}