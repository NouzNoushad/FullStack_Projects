import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
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
        ref: 'JFile',
        required: true,
    }
}, {
    timestamps: true,
});

export const productModel = mongoose.models.JProduct || model('JProduct', productSchema);