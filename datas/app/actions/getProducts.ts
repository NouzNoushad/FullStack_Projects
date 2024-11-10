import axios from "axios";
import { Product } from "../interfaces/productInterface";

export async function getProductsAction(): Promise<Product[]> {
    try {
        const url = "http://localhost:3000/api/products";
        const products = await axios.get(url);
        return products.data;
    } catch (error) {
        console.error(`Error fetching products: ${error}`)
        throw error;
    }
}