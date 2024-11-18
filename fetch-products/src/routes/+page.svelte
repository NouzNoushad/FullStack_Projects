<script>
	import ProductItem from '$lib/components/ProductItem.svelte';
import { fetchProducts, products } from '$lib/store/products/fetchProducts';
	import { onMount } from 'svelte';

	onMount(fetchProducts);
</script>

<main class="py-[3rem]">
	<div class="max-w-responsive">
		<div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[10px]">
			{#each $products as product}
				<ProductItem {product}/>
			{/each}
		</div>
	</div>
</main>
