import uploadModel from "$lib/models/File";
import type { RequestHandler } from "@sveltejs/kit";
import path from "path";
import fs from "fs";

// delete upload file
export const DELETE: RequestHandler = async ({ params }) => {
    const { id } = params;

    try {
        const image = await uploadModel.findById(id);
        if (!image) {
            return new Response(JSON.stringify({ error: 'File not found' }), { status: 404 });
        }

        const filePath = path.join(process.cwd(), 'static/uploads', image.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const deleteFile = await uploadModel.findByIdAndDelete(id);
        return deleteFile ? new Response(JSON.stringify(deleteFile), { status: 200 }) : new Response(JSON.stringify('File not found'), { status: 404 });
    } catch (error) {
        return new Response(JSON.stringify('Failed to delete file'), { status: 500 });
    }
}