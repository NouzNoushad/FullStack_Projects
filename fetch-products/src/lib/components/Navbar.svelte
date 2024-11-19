<script>
	import { getCarts, carts } from '$lib/store/cart/getCarts';
	import { onMount } from 'svelte';

	onMount(getCarts);
</script>

<nav class="bg-indigo-950 h-[10vh] w-full">
	<div class="max-w-responsive h-full">
		<div class="h-full flex flex-row items-center justify-between">
			<a href="/" class="text-white text-[1.2rem] font-bold uppercase">Ecom</a>
			<ul>
				<li class="relative">
					<a href="/cart" class="text-white">
						<i class="fa-solid fa-cart-shopping mr-2"></i>
						<span
							class="absolute top-[-8px] right-[-5px] bg-red-500 rounded-[50%] text-bold text-[0.6rem] min-h-[15px] min-w-[15px] px-1 text-center"
							>{$carts.length}</span
						>
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
