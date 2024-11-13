<script lang="ts">
    import { writable } from "svelte/store";
    import "../app.css";
    import { onMount } from "svelte";

    interface Product {
        _id: string;
        name: string;
        brand: string;
        price: number;
        description: string;
    }

    const products = writable<Product[]>([]);

    const fetchProducts = async (): Promise<Product[]> => {
        const response = await fetch("/api/products");
        const data = response.json();
        return data;
    };

    const getProducts = async () => {
        const data: Product[] = await fetchProducts();
        products.set(data);
    };

    onMount(getProducts);
</script>

<main class="py-[5rem]">
    <div class="max-w-[1200px] mx-auto px-5 xl:px-0">
        <ul
            class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[10px]"
        >
            {#each $products as product}
                <li class="bg-black text-white px-5 py-5 rounded-md">
                    <a href="/" class="space-y-1">
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
