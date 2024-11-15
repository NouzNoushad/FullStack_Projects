import mongoose, { Document, model, Schema } from "mongoose"

export interface SFile extends Document {
    filename: string;
    path: string;
    size: number;
}

const FileSchema = new Schema<SFile>({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    }
});

export const FileModel = mongoose.models.FileDocument || model('FileDocument', FileSchema);