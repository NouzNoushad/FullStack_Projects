import express from "express"
import { createEcomProduct, getEcomProducts } from "../controllers/products_controller.js"
import { uploadImageMiddleware } from "../middlewares/upload_middleware.js"

const router = express.Router()

router.post('/create_ecom_product', uploadImageMiddleware, createEcomProduct)
router.get('/get_ecom_products', getEcomProducts)

export default router