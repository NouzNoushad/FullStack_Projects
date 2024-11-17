import { writable } from "svelte/store";

export let products = writable([]);

export const getProducts = async () => {
    try {
        const response = await fetch('/api/products');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            products.set(data);
        } else {
            console.log('Failed to fetch products');
        }
    } catch (error) {
        console.error('Failed to fetch products', error);
    }
}