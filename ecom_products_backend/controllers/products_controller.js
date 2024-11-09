import productSchema from "../models/product_model.js"
import fileSchema from "../models/file_model.js"

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
                            })
                        })
                    }
                }
            }
        })
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// get all products
export const getEcomProducts = async (req, res) => {
    try {
        await productSchema.find({}).then((products) => {
            res.status(200).json({
                message: `${products.length} items`,
                products,
            })
        })
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            error: error,
        })
    }
}