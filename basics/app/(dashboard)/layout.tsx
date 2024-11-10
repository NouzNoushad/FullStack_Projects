import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1>Dashboard Users</h1>
            {children}
        </div>
    )
}
