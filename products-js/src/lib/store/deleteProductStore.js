import { goto } from "$app/navigation";
import { getProducts } from "./getProductsStore";

export const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Product deleted');
            getProducts();
        } else {
            console.log('Failed to delete');
        }
    } catch (error) {
        console.error(`Failed to delete : ${error}`);
    }
}