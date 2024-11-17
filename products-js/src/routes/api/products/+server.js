import connectToDatabase from '$lib/db.js';
import path from "path";
import fs from "fs";
import { fileModel } from '$lib/models/File.js';
import { productModel } from '$lib/models/Product.js';

// connect to db
connectToDatabase();

// post products
export const POST = async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const brand = data.get('brand');
    const price = data.get('price');
    const description = data.get('description');
    const file = data.get('image');

    console.log(`/////// name: ${name}, brand: ${brand}, price: ${price}, des: ${description}, file: ${file}`);

    if (!file) {
        return new Response(JSON.stringify({ error: 'File not uploaded' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = Date.now() + '-' + file.name;
    const filePath = path.join(process.cwd(), 'static/uploads', fileName);

    try {
        // save to local
        fs.writeFileSync(filePath, buffer);

        // save to file db
        const newFile = await fileModel.create({
            filename: fileName,
            path: `uploads/${fileName}`,
            size: buffer.byteLength,
        });
        // save to product db
        const newProduct = await productModel.create({
            name,
            brand,
            price,
            description,
            image: newFile._id,
        });
        return new Response(JSON.stringify(newProduct), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to post product' }), { status: 500 });
    }
}

// get products
export const GET = async () => {
    try {
        const products = await productModel.find().populate('image');
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}