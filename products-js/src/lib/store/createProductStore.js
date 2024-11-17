import { goto } from "$app/navigation";
import { writable, get } from "svelte/store";

export const product = writable({
    name: "",
    brand: "",
    price: 0,
    description: "",
    image: null
});

export let imageFile = null;
export const fileName = writable("");
export const isEditMode = writable(false);
export const productId = writable("");

// handle file change
export const handleFileChange = (e) => {
    const data = e.target;
    console.log("files:" + data.files);
    if (data.files.length) {
        imageFile = data.files[0];
        fileName.set(data.files[0].name);
    } else {
        fileName.set("");
    }
}

// create product
export const createProduct = async () => {
    const formData = new FormData();
    const currentProduct = get(product);
    formData.append('name', currentProduct.name);
    formData.append('brand', currentProduct.brand);
    formData.append('price', currentProduct.price);
    formData.append('description', currentProduct.description);
    if (imageFile) {
        formData.append('image', imageFile);
    }
    formData.append('image', "");

    const url = get(isEditMode) ? `/api/products/${get(productId)}` : '/api/products';
    const method = get(isEditMode) ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            body: formData,
        });
        if (response.ok) {
            console.log('Success');
            product.set({
                name: "",
                brand: "",
                price: 0,
                description: "",
                image: null
            });
            fileName.set("");
            imageFile = null;
            goto("/");
        } else {
            console.log('Failed');
        }
    } catch (error) {
        console.error('Failed', error);
    }
}

export const fetchProduct = async (productId) => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
            const data = await response.json();
            product.set(data);
            fileName.set(data.image.filename);
        } else {
            console.log('Failed fetch product');
        }
    } catch (error) {
        console.error("Failed: ", error);
    }
}