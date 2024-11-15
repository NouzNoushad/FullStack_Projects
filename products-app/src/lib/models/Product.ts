import mongoose, { Document, model, Schema } from "mongoose"
import { type SFile } from "./File";

interface SProduct extends Document {
    name: string;
    brand: string;
    price: number;
    description: string;
    image: SFile;
}

const ProductSchema = new Schema<SProduct>({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'FileDocument',
        required: true,
    },
}, {
    timestamps: true,
});

export const ProductModel = mongoose.models.ProductDocument || model('ProductDocument', ProductSchema);