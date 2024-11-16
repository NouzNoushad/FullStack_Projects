<script lang="ts">
    import { page } from "$app/stores";
    import {
        createProduct,
        handleFileChange,
        product,
        fileName,
        productId,
        isEditMode,
        fetchProduct,
    } from "$lib/store/productStore";
    import { onMount } from "svelte";

    $: {
        const searchParams = new URLSearchParams($page.url.search);
        productId.set(searchParams.get("id"));
        isEditMode.set(!!$productId);
        if (!$isEditMode) {
            fileName.set("");
            product.set({
                name: "",
                brand: "",
                price: 0,
                description: "",
                image: null,
            });
        }
    }

    onMount(() => {
        if ($isEditMode && $productId) {
            fetchProduct($productId ?? "");
        }
    });
</script>

<section class="py-[5rem]">
    <div class="max-w-[600px] mx-auto px-5 xl:px-0">
        <form
            on:submit|preventDefault={createProduct}
            class="bg-background px-8 py-8 rounded-lg space-y-2"
        >
            <input
                type="text"
                bind:value={$product.name}
                class="bg-input px-3 py-2"
                placeholder="Name"
            />
            <input
                type="text"
                bind:value={$product.brand}
                class="bg-input px-3 py-2"
                placeholder="Brand"
            />
            <input
                type="number"
                bind:value={$product.price}
                class="bg-input px-3 py-2"
                placeholder="Price"
            />
            <div class="bg-input flex flex-row items-center">
                <p
                    class={$fileName
                        ? "text-black grow px-3 py-2"
                        : "text-slate-400 grow px-3 py-2"}
                >
                    {$fileName ? $fileName : "Image"}
                </p>
                <label>
                    <span
                        class="bg-background px-10 py-2 rounded-md uppercase text-[0.9rem] transition-all duration-300 hover:bg-slate-900"
                        >Upload</span
                    >
                    <input
                        type="file"
                        class="hidden"
                        on:change={handleFileChange}
                    />
                </label>
            </div>
            <textarea
                rows="4"
                bind:value={$product.description}
                class="bg-input px-3 py-2"
                placeholder="Description..."
            ></textarea>
            <div class="pt-5 flex md:justify-end justify-center">
                <button
                    type="submit"
                    class="border-2 border-white text-[0.9rem] uppercase px-6 py-3 rounded-md font-[500] tracking-[0.03rem] transition-all duration-300 hover:bg-slate-900 shadow-lg"
                >
                    {$isEditMode ? "Update" : "Create"} Product
                </button>
            </div>
        </form>
    </div>
</section>
