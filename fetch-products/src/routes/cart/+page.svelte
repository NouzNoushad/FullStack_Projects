<script>
	import CartItem from '$lib/components/CartItem.svelte';
	import { getCarts, carts } from '$lib/store/cart/getCarts';
	import { onMount } from 'svelte';

	onMount(getCarts);
</script>

<section class="py-[4rem]">
	<div class="max-w-responsive">
		<div class="flex flex-col md:flex-row items-start gap-[20px]">
			<div class="md:w-2/3 w-full border-2 border-gray-200 px-3 py-5 rounded-md space-y-2">
				{#each $carts as cart}
					<CartItem {cart} />
				{/each}
			</div>
			<div class="md:w-1/3 w-full border-2 border-gray-200 px-4 py-3 rounded-md h-[200px] flex flex-col">
				<div class="grow flex flex-col justify-center gap-2">
					<div class="flex flex-row items-center justify-between">
						<h2 class="font-[500] text-slate-400">Subtotal</h2>
						<p class="text-[1rem] text-slate-400 font-[500]">
							${$carts.reduce((acc, cart) => acc + cart.price, 0).toFixed(2)}
						</p>
					</div>
					<div class="flex flex-row items-center justify-between">
						<h2 class="font-[500] text-slate-400">Discount</h2>
						<p class="text-[1rem] text-slate-400 font-[500]">$0</p>
					</div>
					<div class="flex flex-row items-center justify-between">
						<h2 class="font-[600] text-[1.1rem]">Total</h2>
						<p class="text-[1.25rem] text-red-600 font-[500]">${$carts.reduce((acc, cart) => acc + cart.price, 0).toFixed(2)}</p>
					</div>
				</div>
				<button class="mt-5 bg-indigo-950 text-white font-[500] rounded-md px-2 py-2 w-full"
					>Checkout</button
				>
			</div>
		</div>
	</div>
</section>
