import { writable } from "svelte/store";

export const products = writable([]);

export const fetchProducts = async () => {
    try {
        const url = "https://fakestoreapi.com/products";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(`//////////// data: ${data.length}`);
            products.set(data);
        } else {
            console.log('Failed to fetch products');
        }

    } catch (error) {
        console.error('Failed to fetch products', error);
    }
}