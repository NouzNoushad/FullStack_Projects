import { fetchProducts } from "./getProductStore";

export const deleteProduct = async (productId: string) => {
    try {
        const response = await fetch(`api/product/${productId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Product deleted');
            fetchProducts();
        } else {
            console.log('Failed to delete product');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}