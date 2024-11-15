import connectToDatabase from "$lib/db";
import { FileModel } from "$lib/models/File";
import { ProductModel } from "$lib/models/Product";
import type { RequestHandler } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

// connect to db
connectToDatabase();

export const DELETE: RequestHandler = async ({ params }) => {
    const { id } = params;

    try {
        // delete file
        const product = await ProductModel.findById(id).populate('image');

        if (product.image) {
            const filePath = path.join(process.cwd(), 'static/uploads', product.image.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await FileModel.findByIdAndDelete(product.image._id);
        } else {
            new Response(JSON.stringify({ error: 'Image not found' }), { status: 400 });
        }

        const deleteProduct = await ProductModel.findOneAndDelete({ _id: id });
        return deleteProduct ? new Response(JSON.stringify(deleteProduct), { status: 200 }) : new Response(JSON.stringify({ error: 'Failed to delete' }), { status: 400 });
    } catch (error) {
        return new Response(JSON.stringify('Failed to delete product'), { status: 500 });
    }
}