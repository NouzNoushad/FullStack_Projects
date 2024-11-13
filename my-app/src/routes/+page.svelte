<script lang="ts">
    import { writable } from "svelte/store";
    import "../app.css";
    import { onMount } from "svelte";

    const products = writable<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products/");
            if (!response.ok) {
                throw new Error("Products not found");
            } else {
                const data = await response.json();
                products.set(data);
            }
        } catch (error) {
            console.error("Failed fetch products", error);
        }
    };
    onMount(fetchProducts);
</script>

<main class="py-[5rem]">
    <div class="max-w-[1200px] mx-auto px-5 xl:px-0">
        <ul
            class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[10px]"
        >
            {#each $products as product}
                <li class="bg-black text-white px-5 py-5 rounded-md">
                    <a href={`/${product._id}`} class="space-y-1">
                        <h1 class="text-[1.2rem] font-[500]">{product.name}</h1>
                        <h3 class="font-[500] text-[0.9rem]">
                            {product.brand}
                        </h3>
                        <p class="text-[1.3rem] font-bold">${product.price}</p>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</main>
