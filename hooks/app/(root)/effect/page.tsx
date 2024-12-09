import React, { useEffect, useState } from 'react'

export default function Effect() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        setTimeout(() => setCount(count + 1), 1000)
    }, [count])
    
  return (
      <main className="flex flex-col items-center justify-center h-screen gap-5">
          <h1>Timer: {count}</h1>
      </main>
  )
}
