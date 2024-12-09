import prisma from "@/app/utils/prisma"

export const GET = async () => {
    try {
        const carts = await prisma.cart.findMany()
        return new Response(JSON.stringify({ message: `items: ${carts.length}`, carts }), { status: 200 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return new Response(JSON.stringify({ error: 'Failed to fetch carts' }), { status: 500 })
    }
}

export const POST = async (request) => {
    const { image, title, price, description, rating = { rate: 0 }, category } = await request.json()

    console.log(`//////// product: title: ${title}, image: ${image}, pri: ${typeof (parseFloat(price))}, des: ${description}, rating: ${typeof (rating.rate)}, cat: ${category}`)

    try {
        const newCart = await prisma.cart.create({
            data: {
                title,
                image,
                price,
                category,
                rating: rating.rate,
                description
            }
        })

        return new Response(JSON.stringify({ message: 'Added', cart: newCart }), { status: 201 })
    } catch (error) {
        console.log('///////////////// Error: ', error)
        return new Response(JSON.stringify({ error: error }), { status: 500 })
    }
}