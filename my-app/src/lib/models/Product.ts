import mongoose, { model, Schema, Document } from "mongoose";

interface IProduct extends Document {
    name: string;
    brand: string;
    price: number;
    description: string;
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
    }
}, {
    timestamps: true,
})

const ProductModel = mongoose.models.SPrduct || model('SProduct', productSchema);

export default ProductModel;