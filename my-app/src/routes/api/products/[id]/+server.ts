import { connectToDatabase } from "$lib/db";
import ProductModel from "$lib/models/Product";
import type { RequestHandler } from "@sveltejs/kit";

// connect to db
connectToDatabase();

// get product by id
export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return new Response(JSON.stringify({ message: 'Product not found' }));
        }
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to return product' }));
    }
}

// delete product
export const DELETE: RequestHandler = async ({ params }) => {
    const { id } = params;
    try {
        const deletePost = await ProductModel.findByIdAndDelete(id);
        return deletePost ? new Response(JSON.stringify(deletePost), { status: 200 }) : new Response(JSON.stringify({ message: 'Product not found' }));
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to delete product' }));
    }
}