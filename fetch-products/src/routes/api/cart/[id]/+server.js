import prisma from '$lib/prisma.js';

// delete cart
export const DELETE = async ({ params }) => {
    const { id } = params;
    try {
        await prisma.cart.delete({ where: { id: parseInt(id) } });
        return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: `Failed to delete cart: ${error}` }), { status: 500 });
    }
}