'use server'

import axios from "axios";
import { Product } from "../interfaces/productInterface";


export async function addProductAction(product: Product): Promise<void> {
    try {
        const url = "http://localhost:3000/api/products"
        const response = await axios.post(url, product);
        console.log(response.status)
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error)
        throw error;
    }
}