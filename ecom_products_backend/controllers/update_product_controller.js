import productSchema from "../models/product_model.js"
import fileSchema from "../models/file_model.js"
import fs from "fs"
import path from "path"

// update product
export const updateEcomProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updatedProduct = { $set: {} }

        req.upload(req, res, async (error) => {
            const { name, brand, price, description, image } = req.body
            if (error) {
                res.status(404).json({
                    message: `File upload error: ${error}`
                })
            } else if (req.file) {
                const imageFile = await fileSchema.findOne(image)
                const imagePath = path.join(imageFile.path)
                console.log(`image path: ${imagePath}`)

                // find existing image in local and delete
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
                // delete existing image in database
                await fileSchema.findOneAndDelete(image)

                // save file image
                await fileSchema.create(req.file).then((image) => {
                    updatedProduct.$set = { image: image._id }

                    const newImagePath = path.join('public/images', req.file.filename)
                    console.log(`new image path: ${newImagePath}`)
                    fs.renameSync(req.file.path, newImagePath)
                })
            }

            if (name) updatedProduct.$set.name = name
            if (brand) updatedProduct.$set.brand = brand
            if (price) updatedProduct.$set.price = price
            if (description) updatedProduct.$set.description = description

            // update product
            await productSchema.findOneAndUpdate({ _id: id }, updatedProduct, { new: true }).then((product) => {
                res.status(200).json({
                    message: "Product updated",
                    product,
                })
            }).catch((error) => {
                res.status(500).json({
                    message: "Failed to update product",
                    error
                })
            })

        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error
        })
    }
}