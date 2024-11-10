import axios from "axios";
import { Product } from "../interfaces/productInterface";

export async function updateProductAction(params: string, product: Product): Promise<boolean> {
    try {
        const url = `http://localhost:3000/api/products/${params}`;
        await axios.put(url, product);
        return true;
    } catch (error) {
        console.error(`Error updating product: ${error}`)
        throw error;
    }
}