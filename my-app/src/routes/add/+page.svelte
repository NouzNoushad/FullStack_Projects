<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let product: Product = {
        name: "",
        brand: "",
        price: 0,
        description: "",
    };

    let isEditMode = false;
    let productId: string | null = null;

    $: {
        const searchParams = new URLSearchParams($page.url.search);
        productId = searchParams.get("id");
        isEditMode = !!productId;
        if (!isEditMode) {
            product = {
                name: "",
                brand: "",
                price: 0,
                description: "",
            };
        }
    }

    const handleSubmit = async () => {
        const url = isEditMode ? `/api/products/${productId}` : "/api/products";
        const method = isEditMode ? "PUT" : "POST";
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Success", result);
                goto("/");
                product = {
                    name: "",
                    brand: "",
                    price: 0,
                    description: "",
                };
            } else {
                const errorData = await response.json();
                console.log("Error: ", errorData.message);
            }
        } catch (error) {
            console.error("Failed to submit", error);
        }
    };

    onMount(async () => {
        if (isEditMode && productId) {
            try {
                const response = await fetch(`/api/products/${productId}`);
                if (response.ok) {
                    product = await response.json();
                } else {
                    console.error("Failed to load product");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
    });
</script>

<section class="py-[5rem]">
    <div class="max-w-[600px] mx-auto px-5 xl:px-0">
        <form
            on:submit|preventDefault={handleSubmit}
            class="border-2 border-black bg-slate-50 rounded-md px-8 py-10 space-y-2"
        >
            <input
                type="text"
                placeholder="Name"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={product.name}
            />
            <input
                type="text"
                placeholder="Brand"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={product.brand}
            />
            <input
                type="number"
                placeholder="Price"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={product.price}
            />
            <textarea
                rows={4}
                placeholder="Name"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={product.description}
            ></textarea>
            <div class="flex justify-center md:justify-end pt-5">
                <button
                    type="submit"
                    class="border border-slate-200 bg-white rounded-md px-[50px] py-[10px] uppercase text-[0.9rem] font-[500] transition-all duration-300 hover:border-black"
                    >{isEditMode ? "Update" : "Add"} Product</button
                >
            </div>
        </form>
    </div>
</section>
