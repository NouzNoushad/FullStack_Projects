import prisma from "@/app/utils/prisma"

export const DELETE = async (request, { params }) => {
    const { id } = await params

    try {
        const deleteCart = await prisma.cart.delete({
            where: {
                id: parseInt(id)
            }
        })
        return deleteCart ? new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 }) : new Response(JSON.stringify({ message: 'Failed' }), { status: 400 })
    } catch (error) {
        console.log(`Error: ${error}`)
        return new Response(JSON.stringify({ error: 'Failed to delete cart' }), { status: 500 })
    }
}