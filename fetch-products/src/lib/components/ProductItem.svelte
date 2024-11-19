<script>
	import { addToCart } from '$lib/store/cart/addCart';

	const { product } = $props();
</script>

<div class="border border-black rounded-md shadow-lg px-5 py-5 flex flex-col cursor-pointer">
	<div class="grow">
		<img src={product.image} alt="" class="min-[400px]:h-[400px] mx-auto sm:h-[200px]" />
		<h2 class="mt-4 text-[1.1rem] font-[500]">{product.title}</h2>
		<h4 class="text-[0.9rem] font-[500] uppercase text-slate-900">{product.category}</h4>
		<p class="text-[1.5rem] font-bold text-red-600">${product.price}</p>
		<div class="flex flex-row items-center gap-[5px]">
			<div class="flex flex-row">
				{#each Array(Math.floor(product.rating.rate)) as _}
					<i class="fa-solid fa-star text-yellow-500"></i>
				{/each}
				{#each Array(6 - Math.ceil(product.rating.rate)) as _}
					<i class="fa-regular fa-star text-yellow-500"></i>
				{/each}
			</div>
			<span class="text-[0.8rem] text-gray-400">({product.rating.rate})</span>
		</div>
	</div>
	<button
		onclick={() => addToCart(product)}
		class="mt-5 bg-green-500 w-full rounded-md px-2 py-2 text-white font-[500] space-x-3"
	>
		<span>Add To Cart</span>
		<i class="fa-solid fa-cart-shopping mr-2"></i>
	</button>
</div>
