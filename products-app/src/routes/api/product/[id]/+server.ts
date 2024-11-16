import connectToDatabase from "$lib/db";
import { FileModel } from "$lib/models/File";
import { ProductModel } from "$lib/models/Product";
import type { RequestHandler } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

// connect to db
connectToDatabase();

// fetch by id
export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;

    try {
        const product = await ProductModel.findById(id).populate('image');
        return product ? new Response(JSON.stringify(product), { status: 200 }) : new Response(JSON.stringify({ error: 'Product not found' }), { status: 400 });
    } catch (error) {
        return new Response(JSON.stringify('Failed to fetch product'), { status: 500 });
    }
}

// delete product
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

// update product
export const PUT: RequestHandler = async ({ request, params }) => {
    const { id } = params;

    try {
        const data = await request.formData();
        const file = data.get('image') as File | "";
        const name = data.get('name') as string | "";
        const brand = data.get('brand') as string | "";
        const description = data.get('description') as string;
        const priceString = data.get('price') as string | "";
        const price = priceString ? parseFloat(priceString) : 0;
        let updatedImage: string = "";

        const product = await ProductModel.findById(id).populate('image');

        console.log(`formdata file: ${file}`);

        if (file) {
            // delete current file
            const currentFile = await FileModel.findById(product.image._id);
            if (currentFile) {
                const filePath = path.join(process.cwd(), 'static/uploads', currentFile.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }

                await FileModel.findByIdAndDelete(currentFile._id);
            }

            // save new file
            const arrayBuffer = await file?.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const newFileName = Date.now() + '-' + file.name;

            const newFilePath = path.join(process.cwd(), 'static/uploads', newFileName);

            fs.writeFileSync(newFilePath, buffer);

            const newFile = await FileModel.create({
                filename: newFileName,
                path: `uploads/${newFileName}`,
                size: buffer.byteLength,
            });

            updatedImage = newFile._id;
            console.log(`///////// filemodel: ${newFile._id}`);
        }
        else {
            updatedImage = product.image._id;
        }

        console.log(`////////// img: ${updatedImage}, name: ${name}, brn: ${brand}, pr: ${price}, des: ${description}`);

        const updateProductModel = await ProductModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name,
                brand,
                price,
                description,
                image: updatedImage,
            }
        }, { new: true }).populate('image');

        return updateProductModel ? new Response(JSON.stringify(updateProductModel), { status: 200 }) : new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 400 });

    } catch (error) {
        return new Response(JSON.stringify('Failed to update product'), { status: 500 });
    }
}