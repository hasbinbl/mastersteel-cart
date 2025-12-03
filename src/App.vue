<script setup lang="ts">
import ProductList from './components/product/ProductList.vue';
import CartDrawer from './components/cart/CartDrawer.vue';
import { useCartStore } from './stores/cartStore';
import CheckoutModal from './components/cart/CheckoutModal.vue';

const cartStore = useCartStore();
</script>

<template>
	<div class="min-h-screen bg-secondary-light">
		<header
			class="bg-white shadow sticky top-0 z-40 border-b border-gray-200"
		>
			<div
				class="container mx-auto px-4 h-20 flex items-center justify-between"
			>
				<div class="flex items-center gap-3">
					<div class="w-12 h-12 flex items-center justify-center">
						<img
							src="/mastersteel-logo.png"
							alt="Master Steel Logo"
							class="w-full h-full object-contain"
						/>
					</div>
					<div>
						<h1
							class="text-xl font-black text-secondary-dark uppercase tracking-tighter leading-none mb-0.5"
						>
							Master Steel
						</h1>
						<p
							class="text-[10px] text-gray-500 font-bold tracking-widest uppercase"
						>
							Sistem Cart Belanja
						</p>
					</div>
				</div>

				<button
					@click="cartStore.toggleDrawer()"
					class="relative group p-2 rounded-full hover:bg-gray-100 transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-secondary-dark group-hover:text-primary transition-colors"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>

					<span
						v-if="cartStore.totalItems > 0"
						class="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white transform translate-x-1 -translate-y-1 shadow-sm"
					>
						{{ cartStore.totalItems }}
					</span>
				</button>
			</div>
		</header>

		<main>
			<ProductList />
		</main>

		<CartDrawer />
		<CheckoutModal />
	</div>
</template>
