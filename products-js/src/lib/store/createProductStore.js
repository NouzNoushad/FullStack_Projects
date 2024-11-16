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
    const currentProduct = getContext(product);
    formData.append('name', currentProduct.name);
    formData.append('brand', currentProduct.brand);
    formData.append('price', currentProduct.price);
    formData.append('description', currentProduct.description);
    formData.append('image', imageFile);

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });

    } catch (error) {
        console.error('Failed to create product', error);
    }
}