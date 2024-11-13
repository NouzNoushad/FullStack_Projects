import mongoose, { model, Schema, Document } from "mongoose";

interface SUpload extends Document {
    filename: string;
    path: string;
    size: number;
}

const uploadSchema = new Schema<SUpload>({
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
}, {
    timestamps: true,
})

const uploadModel = mongoose.models.UploadFile || model('UploadFile', uploadSchema);

export default uploadModel;