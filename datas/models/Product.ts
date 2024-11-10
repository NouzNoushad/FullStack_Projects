import mongoose, { Document, model, Schema } from "mongoose"

interface Product extends Document {
    name: string,
    brand?: string,
    price: number,
    description?: string,
}

const ProductSchema: Schema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    }
}, {
    timestamps: true,
})

export default mongoose.models.dataModel || model('dataModel', ProductSchema)