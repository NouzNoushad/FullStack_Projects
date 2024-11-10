'use server'

import axios from "axios";

export async function deleteProductAction(params: string): Promise<boolean> {
    try {
        const url = `http://localhost:3000/api/products/${params}`;
        await axios.delete(url);
        return true;
    } catch (error) {
        console.error(`Error deleting product: ${error}`);
        throw error;
    }
}