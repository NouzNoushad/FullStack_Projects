import connectToDatabase from "$lib/db";
import { fileModel } from "$lib/models/File.js";
import { productModel } from "$lib/models/Product";
import path from "path";
import fs from "fs";

// connect to database
connectToDatabase();

// delete product
export const DELETE = async ({ params }) => {
    const { id } = params;
    try {
        const product = await productModel.findById(id).populate('image');
        const file = await fileModel.findOne({ _id: product.image._id });
        console.log(`file : ${file.filename}`);

        if (file) {
            // delete from local
            const filePath = path.join(process.cwd(), 'static/uploads', file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            // delete from db
            await fileModel.findByIdAndDelete(file._id);
        }

        const deleteProduct = await productModel.findOneAndDelete({ _id: id });
        return deleteProduct ? new Response(JSON.stringify(deleteProduct), { status: 200 }) : new Response(JSON.stringify('Failed to delete'), { status: 400 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
    }
}