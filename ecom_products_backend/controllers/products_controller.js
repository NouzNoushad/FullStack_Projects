import productSchema from "../models/product_model.js"
import fileSchema from "../models/file_model.js"
import fs from "fs"
import path from "path"

// create new product
export const createEcomProduct = async (req, res) => {
    try {
        req.upload(req, res, async (error) => {
            if (error) {
                res.status(404).json({
                    message: `Error: ${error}`
                })
            }
            else if (!req.file) {
                res.status(500).json({
                    message: "File not found"
                })
            } else {
                const { name, brand, price, description } = req.body
                console.log(`name: ${name}, brand: ${brand}, price: ${price}, des: ${description}`)

                // validations
                if (!name) {
                    res.status(500).json({
                        message: "Name field is required",
                    })
                }
                else if (!price) {
                    res.status(500).json({
                        message: "Price field is required",
                    })
                } else {
                    // check product exists
                    const product = await productSchema.findOne({ name: name })
                    if (product) {
                        res.status(500).json({
                            message: "Product already exists"
                        })
                        // delete file form local storage
                        fs.unlinkSync(req.file.path)
                    } else {
                        // save image file
                        await fileSchema.create(req.file).then(async (image) => {
                            // save product
                            const newProduct = productSchema({
                                name,
                                brand,
                                price,
                                description,
                                image: image._id,
                            })
                            await newProduct.save().then(() => {
                                res.status(200).json({
                                    message: 'New product created'
                                })
                            }).catch((error) => {
                                res.status(500).json({
                                    message: "Failed to create product",
                                    error
                                })
                            })
                        })
                    }
                }
            }
        })
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            error
        })
    }
}

// get all products
export const getEcomProducts = async (req, res) => {
    try {
        await productSchema.find().then((products) => {
            res.status(200).json({
                message: `${products.length} items`,
                products,
            })
        }).catch((error) => {
            res.status(500).json({
                message: "Failed"
            })
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error: error,
        })
    }
}

// get product
export const getEcomProductById = async (req, res) => {
    try {
        const { id } = req.params
        await productSchema.findById(id).then((product) => {
            if (product) {
                res.status(200).json({
                    message: "Product found",
                    product,
                })
            }
        }).catch((error) => {
            res.status(500).json({
                message: "Product not found"
            })
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error: error,
        })
    }
}

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