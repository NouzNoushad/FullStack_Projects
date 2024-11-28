import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// get product
export const GET = async (request, { params }) => {
    const { id } = await params
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        })
        return new Response(JSON.stringify({ product }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 })
    }
}