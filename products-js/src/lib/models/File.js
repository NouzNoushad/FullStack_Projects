import mongoose, { model, Schema } from "mongoose";

const fileSchema = new Schema({
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

export const fileModel = mongoose.models.JFile || model('JFile', fileSchema);