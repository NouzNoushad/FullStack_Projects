import { connectToDatabase } from "$lib/db";
import ProductModel from "$lib/models/Product";
import type { RequestHandler } from "@sveltejs/kit";

// connect to db
connectToDatabase();

// post product
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const { name, brand, price, description } = data;

    try {
        const newProduct = new ProductModel({
            name,
            brand,
            price,
            description,
        })
        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to create product' }))
    }
}

// get products
export const GET: RequestHandler = async () => {
    try {
        const products = await ProductModel.find();
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to return products' }));
    }
}