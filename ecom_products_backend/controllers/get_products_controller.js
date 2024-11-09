import productSchema from "../models/product_model.js"

// get all products
export const getEcomProducts = async (req, res) => {
    try {
        await productSchema.find().populate('image').then((products) => {
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

// get product by id
export const getEcomProductById = async (req, res) => {
    try {
        const { id } = req.params
        await productSchema.findById(id)
            .populate('image')
            .then((product) => {
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