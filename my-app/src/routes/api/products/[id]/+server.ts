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
        const deleteProduct = await ProductModel.findByIdAndDelete(id);
        return deleteProduct ? new Response(JSON.stringify(deleteProduct), { status: 200 }) : new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to delete product' }));
    }
}

// update product
export const PUT: RequestHandler = async ({ request, params }) => {
    const { id } = params;
    const product = await request.json();
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true });
        return updateProduct ? new Response(JSON.stringify(updateProduct), { status: 200 }) : new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to updated product' }));
    }
}