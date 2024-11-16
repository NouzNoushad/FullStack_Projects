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
export const isEditMode = writable<boolean>(false);
export const productId = writable<string | null>(null);

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

    try {
        const formData = new FormData();
        const currentProduct = get(product);

        formData.append("name", currentProduct.name);
        formData.append("brand", currentProduct.brand);
        formData.append("price", currentProduct.price.toString());
        formData.append("description", currentProduct.description);
        if (imageFile) {
            formData.append("image", imageFile);
        } else {
            formData.append("image", "");
        }

        const url = get(isEditMode) ? `/api/product/${get(productId)}` : '/api/product';

        const method = get(isEditMode) ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            body: formData,
        });

        if (response.ok) {
            console.log("Success");
            fileName.set("");
            product.set({
                name: "",
                brand: "",
                price: 0,
                description: "",
                image: null,
            });
            imageFile = null;
            goto("/");
        } else {
            console.log("Failed");
        }
    } catch (error) {
        console.error("");
    }
};

export const fetchProduct = async (productId: string) => {
    try {
        const response = await fetch(`/api/product/${productId}`);
        if (response.ok) {
            await response.json().then((pro) => {
                product.set(pro);
                const productFileName = pro.image.filename;
                fileName.set(productFileName ?? "");
            }).catch((error) => {
                console.error('Failed to fetch', error);
            })
        } else {
            console.error('Failed to fetch product');
        }
    } catch (error) {
        console.error('Error fetching product', error);
    }
}