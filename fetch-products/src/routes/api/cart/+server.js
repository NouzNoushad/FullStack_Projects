import prisma from '$lib/prisma.js';

// post cart
export const POST = async ({ request }) => {
    const { image, title, category, price, description, rating } = await request.json();
    // console.log(`image: ${image}, title: ${title}, cat: ${category}, price: ${price}, des: ${description}, rating: ${rating.rate}`);

    try {
        const newCart = await prisma.cart.create({
            data: { image, title, category, price, description, rating: rating.rate }
        });
        return new Response(JSON.stringify({ message: 'Product added to cart', cart: newCart }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: `Failed to post cart: ${error}` }), { status: 500 });
    }
}

// get carts
export const GET = async () => {
    try {
        const carts = await prisma.cart.findMany();
        return new Response(JSON.stringify({ message: `items: ${carts.length}`, carts }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: `Failed to fetch cart: ${error}` }), { status: 500 });
    }
}