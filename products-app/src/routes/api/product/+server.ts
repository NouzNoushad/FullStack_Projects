import type { RequestHandler } from "@sveltejs/kit";
import path from "path";
import fs from "fs";
import { ProductModel } from "$lib/models/Product";
import { FileModel } from "$lib/models/File";
import connectToDatabase from "$lib/db";

// connect to db
connectToDatabase();

// post product
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('image') as File | null;
    const name = data.get('name') as string | "";
    const brand = data.get('brand') as string | "";
    const description = data.get('description') as string;
    const priceString = data.get('price') as string | "";
    const price = priceString ? parseFloat(priceString) : 0;

    console.log(`form data: file: ${file}, name: ${name}, brand: ${brand}, des: ${description}, price: ${price}`);

    if (!file) {
        return new Response(JSON.stringify('File not uploaded'), { status: 400 });
    }

    // create buffer
    const arrayBuffer = await file?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = Date.now() + '-' + file.name;

    // file path
    const filePath = path.join(process.cwd(), 'static/uploads', fileName);

    try {
        // save file to local
        fs.writeFileSync(filePath, buffer);

        // save file to db
        const newImage = await FileModel.create({
            filename: fileName,
            path: `uploads/${fileName}`,
            size: buffer.byteLength,
        });

        console.log(`new Image: ${newImage.filename}, id: ${newImage._id}`);

        // save product to db
        const newProduct = new ProductModel({
            name,
            brand,
            price,
            description,
            image: newImage._id,
        });

        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 200 });
    } catch (error) {
        console.error('Failed to save file:', error);
        return new Response(JSON.stringify({ error: 'Failed to save file' }), { status: 500 });
    }
}

// get products
export const GET: RequestHandler = async () => {
    try {
        const products: Product[] = await ProductModel.find().populate('image');
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch products', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}