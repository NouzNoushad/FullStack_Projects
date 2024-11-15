import { writable } from "svelte/store";

export const products = writable<Product[]>([]);

export const fetchProducts = async () => {
    try {
        const response = await fetch('/api/product');
        if (response.ok) {
            const data = await response.json();
            products.set(data);
        } else {
            console.log('Failed to fetch products');
        }
    } catch (error) {
        console.error('Error: ', error)
    }
}