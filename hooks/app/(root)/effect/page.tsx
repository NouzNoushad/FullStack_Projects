import React, { useEffect, useState } from 'react'

export default function Effect() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        setTimeout(() => setCount(count + 1), 1000)
    }, [count])

  return (
      <main className="center">
          <h1>Timer: {count}</h1>
      </main>
  )
}
