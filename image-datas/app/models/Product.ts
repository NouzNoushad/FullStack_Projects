import mongoose, { Document, model, Schema } from "mongoose"

interface IProduct extends Document {
    name: string;
    brand: string;
    price: number;
    description: string;
    image: string;
}

const productSchema = new Schema<IProduct>({
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
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.models.ProductImage || model('ProductImage', productSchema);