import type { RequestHandler } from "@sveltejs/kit";
import path from "path";
import fs from "fs";
import { ProductModel } from "$lib/models/Product";

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('image') as File | null;
    const name = data.get('name') as string | "";
    const brand = data.get('brand') as string | "";
    const description = data.get('description') as string;
    const priceString = data.get('price') as string | "";
    const price = priceString ? parseFloat(priceString) : 0;

    if (!file) {
        return new Response(JSON.stringify('File not uploaded'), { status: 400 });
    }

    // create buffer
    const arrayBuffer = await file?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // file path
    const filePath = path.join(process.cwd(), 'static/uploads', file.name);

    try {
        // save file to local
        fs.writeFileSync(filePath, buffer);

        // save product to db
        const newProduct = new ProductModel({
            name,
            brand,
            price,
            description,
            image: {
                filename: file.name,
                path: `uploads/${file.name}`,
                size: buffer.byteLength,
            }
        });

        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 200 });
    } catch (error) {
        console.error('Failed to save file:', error);
        return new Response(JSON.stringify({ error: 'Failed to save file' }), { status: 500 });
    }
}