<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let product: Product | null = null;

    const deleteProduct = async (productId: string) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.error("Error: ", response.json());
            } else {
                console.log("Product deleted");
                goto("/");
            }
        } catch (error) {
            console.error("Failed to delete product");
        }
    };

    const fetchProduct = async () => {
        let productId = $page.params.id;

        try {
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
                throw new Error("Product not found");
            } else {
                const data = await response.json();
                product = data;
            }
        } catch (error) {
            console.error("Failed fetch product", error);
        }
    };

    onMount(() => {
        fetchProduct();
    });
</script>

<section class="py-[5rem]">
    <div class="max-w-[600px] mx-auto px-5 xl:px-0">
        {#if product}
            <div class="bg-black text-white px-8 py-8 rounded-md space-y-1">
                <h1 class="text-[1.5rem] font-bold">{product.name}</h1>
                <h2 class="text-[1.2rem] font-[500]">{product.brand}</h2>
                <p class="text-[1.5rem] font-bold">${product.price}</p>
                <p class="">{product.description}</p>
                <div
                    class="pt-[5rem] flex flex-row items-center justify-end gap-[10px]"
                >
                    <a
                        href={`/add?id=${product._id}`}
                        class="border border-white text-white rounded-md px-5 py-2 transition-all duration-300 hover:bg-white hover:text-black"
                        >Update</a
                    >
                    <button
                        on:click={() => product && deleteProduct(product._id!)}
                        class="border border-white text-white rounded-md px-5 py-2 transition-all duration-300 hover:bg-white hover:text-black"
                        >Delete</button
                    >
                </div>
            </div>
        {/if}
    </div>
</section>
