import express from "express"
import { uploadImageMiddleware } from "../middlewares/upload_middleware.js"
import { createEcomProduct } from "../controllers/create_product_controller.js"
import { getEcomProductById, getEcomProducts } from "../controllers/get_products_controller.js"
import { updateEcomProduct } from "../controllers/update_product_controller.js"
import { deleteEcomProduct } from "../controllers/delete_product_controller.js"

const router = express.Router()

router.post('/create_ecom_product', uploadImageMiddleware, createEcomProduct)
router.get('/get_ecom_products', getEcomProducts)
router.get('/get_ecom_product/:id', getEcomProductById)
router.post('/update_ecom_product/:id', uploadImageMiddleware, updateEcomProduct)
router.delete('/delete_ecom_product/:id', deleteEcomProduct)

export default router