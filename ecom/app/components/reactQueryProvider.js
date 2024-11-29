'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function ReactQueryProvider({ children }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
