import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// get products
export const GET = async () => {
    try {
        const products = await prisma.product.findMany()
        return new Response(JSON.stringify({ message: `items: ${products.length}`, products }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 })
    }
}

// post product
export const POST = async (request) => {
    const { product } = await request.json()
    console.log(` product name: ${product.name}, brand: ${product.brand}, price: ${product.price}, des: ${product.description}`)

    try {
        const newProduct = await prisma.product.create({
            data: {
                name: product.name,
                brand: product.brand,
                price: parseFloat(product.price),
                description: product.description,
            }
        })
        console.log(`new product name: ${newProduct.name}, `)
        return new Response(JSON.stringify({ message: 'Product added', newProduct }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to add product' }), { status: 500 })
    }
}