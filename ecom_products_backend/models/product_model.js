import { Schema, model } from "mongoose"

const productSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "EcomFile",
        required: true,
    }
}, {
    timestamps: true,
})

export default model("EcomProduct", productSchema)