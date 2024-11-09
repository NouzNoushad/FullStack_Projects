import express from "express"
import { createEcomProduct, getEcomProductById, getEcomProducts, updateEcomProduct } from "../controllers/products_controller.js"
import { uploadImageMiddleware } from "../middlewares/upload_middleware.js"

const router = express.Router()

router.post('/create_ecom_product', uploadImageMiddleware, createEcomProduct)
router.get('/get_ecom_products', getEcomProducts)
router.get('/get_ecom_product/:id', getEcomProductById)
router.post('/update_ecom_product/:id', uploadImageMiddleware, updateEcomProduct)

export default router