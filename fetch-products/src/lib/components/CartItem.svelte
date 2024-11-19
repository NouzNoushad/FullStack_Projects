<script>
	import { deleteCart } from '$lib/store/cart/deleteCart';

	const { cart } = $props();
</script>

<div
	class="border-2 border-gray-200 px-4 py-4 rounded-md flex flex-col md:flex-row justify-center items-center gap-[20px]"
>
	<img src={cart.image} alt="" class="w-[100px] h-[100px]" />
	<div class="flex flex-col items-start justify-center grow">
		<h2 class="text-[1rem] font-[500]">{cart.title}</h2>
		<h3 class="uppercase text-[0.9rem] font-[500] text-slate-900">{cart.category}</h3>
		<div class="flex flex-row items-center gap-[5px]">
			<div class="flex flex-row text-[0.8rem]">
				{#each Array(Math.floor(cart.rating)) as _}
					<i class="fa-solid fa-star text-yellow-500"></i>
				{/each}
				{#each Array(6 - Math.ceil(cart.rating)) as _}
					<i class="fa-regular fa-star text-yellow-500"></i>
				{/each}
			</div>
			<span class="text-[0.8rem] text-gray-400">({cart.rating})</span>
		</div>
		<p class="text-[1.2rem] font-bold text-red-600">${cart.price}</p>
	</div>
	<button
		onclick={() => deleteCart(cart.id)}
		aria-label="delete"
		class="bg-slate-100 rounded-[50%] h-[40px] w-[40px] text-indigo-950"
		><i class="fa-solid fa-trash"></i></button
	>
</div>
