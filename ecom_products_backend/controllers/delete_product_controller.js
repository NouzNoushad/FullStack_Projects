import productSchema from "../models/product_model.js"
import fileSchema from "../models/file_model.js"
import path from "path"
import fs from "fs"

// delete product
export const deleteEcomProduct = async (req, res) => {
    try {
        const { id } = req.params
        await productSchema.findById(id).populate('image').then(async (product) => {

            console.log(product.image.filename)
            // delete file from local
            const imageFile = await fileSchema.findOne({ 'filename': product.image.filename })
            const imagePath = path.join(imageFile.path)

            // find existing image in local and delete
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }

            // delete file from database
            await fileSchema.findOneAndDelete({ 'filename': product.image.filename })

            // delete product
            await productSchema.findByIdAndDelete(id)

            res.status(200).json({
                message: "Product deleted"
            })
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error
        })
    }
}