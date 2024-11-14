import type { RequestHandler } from "@sveltejs/kit";
import path from "path";
import fs from "fs";
import uploadModel from "$lib/models/File";
import { connectToMongodb } from "$lib/db";

// connect to database
connectToMongodb();

// post file
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('image') as File;

    if (!file) {
        return new Response('No file uploaded', { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(process.cwd(), 'static/uploads', file.name);

    try {
        fs.writeFileSync(filePath, buffer);
        const newFile = new uploadModel({
            filename: file.name,
            path: `uploads/${file.name}`,
            size: file.size,
        });
        await newFile.save();
        return new Response(JSON.stringify(newFile), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to save file', { status: 500 });
    }
}

// Get file
export const GET = async () => {
    try {
        const files = await uploadModel.find();
        return new Response(JSON.stringify(files), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to fetch files' }), { status: 500 });
    }
}