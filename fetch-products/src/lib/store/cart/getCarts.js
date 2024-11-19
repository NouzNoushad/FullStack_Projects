import { writable } from "svelte/store";

export const carts = writable([]);

export const getCarts = async () => {
    try {
        const response = await fetch('/api/cart');
        if (response.ok) {
            const data = await response.json();
            carts.set(data.carts);
        } else {
            console.log('Failed to fetch carts');
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}