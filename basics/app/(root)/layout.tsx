import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1>NAVBAR</h1>
            {children}
        </div>
    )
}
