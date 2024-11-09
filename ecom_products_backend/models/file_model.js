import { Schema, model } from "mongoose";

const fileSchema = Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    }
})

export default model('EcomFile', fileSchema)