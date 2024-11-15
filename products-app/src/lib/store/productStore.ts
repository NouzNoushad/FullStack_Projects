import { goto } from "$app/navigation";
import { get, writable } from "svelte/store";

export const product = writable<Product>({
    name: "",
    brand: "",
    price: 0,
    description: "",
    image: null,
});

export const fileName = writable<string>("");
let imageFile: File | null = null;

export const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        fileName.set(input.files[0].name);
        imageFile = input.files[0];
    } else {
        fileName.set("");
    }
};

export const createProduct = async () => {
    if (!imageFile) return;

    try {
        const formData = new FormData();
        const currentProduct = get(product);
        formData.append("name", currentProduct.name);
        formData.append("brand", currentProduct.brand);
        formData.append("price", currentProduct.price.toString());
        formData.append("description", currentProduct.description);
        formData.append("image", imageFile);

        const response = await fetch("/api/product", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            console.log("Product added");
            fileName.set("");
            product.set({
                name: "",
                brand: "",
                price: 0,
                description: "",
                image: null,
            });
            goto("/");
        } else {
            console.log("Failed to add product");
        }
    } catch (error) {
        console.error("");
    }
};