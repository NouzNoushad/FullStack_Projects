import mongoose from "mongoose"

const mongodbConnection = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI || "")
        console.log('Mongodb connected')
    } catch (error) {
        console.error(`Mongodb connection Error: ${error}`)
    }
}

export default mongodbConnection;