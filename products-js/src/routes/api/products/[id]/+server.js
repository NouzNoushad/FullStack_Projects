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

// get product
export const GET = async ({ params }) => {
    const { id } = params;
    try {
        const product = await productModel.findById(id).populate('image');
        return product ? new Response(JSON.stringify(product), { status: 200 }) : new Response(JSON.stringify('Failed to fetch product'), { status: 400 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 });
    }
}

// update product
export const PUT = async ({ request, params }) => {
    const { id } = params;
    const data = await request.formData();
    const name = data.get('name');
    const brand = data.get('brand');
    const price = data.get('price');
    const description = data.get('description');
    const file = data.get('image');
    let productImage = "";

    try {
        const product = await productModel.findById(id).populate('image');

        if (file) {
            const currentFile = await fileModel.findOne({ _id: product.image._id });
            console.log(`current file: ${currentFile}`);

            if (currentFile) {
                const currentFilePath = path.join(process.cwd(), 'static/uploads', currentFile.filename);
                // delete file
                if (fs.existsSync(currentFilePath)) {
                    fs.unlinkSync(currentFilePath);
                }

                // delete from db
                await fileModel.findOneAndDelete({ _id: currentFile._id });
            }

            // create new file
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const newFileName = Date.now() + '-' + file.name;
            const newFilePath = path.join(process.cwd(), 'static/uploads', newFileName);

            fs.writeFileSync(newFilePath, buffer);

            const newFile = await fileModel.create({
                filename: newFileName,
                path: `uploads/${newFileName}`,
                size: buffer.byteLength,
            });

            productImage = newFile._id;
        } else {
            productImage = product.image._id;
        }

        const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name,
                brand,
                price,
                description,
                image: productImage,
            }
        }, { new: true });

        return updatedProduct ? new Response(JSON.stringify(updatedProduct), { status: 200 }) : new Response(JSON.stringify('Failed to update'), { status: 400 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
    }
}