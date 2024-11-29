export const addCartAction = () => {
    const handleAddToCart = async (product) => {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if (!response.ok) {
                throw new Error('Failed to add cart')
            }
            const data = await response.json()
            console.log(`data: ${data.message}`)
            window.location.reload()
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    return {
        handleAddToCart,
    }
}