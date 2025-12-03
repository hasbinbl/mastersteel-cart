<script setup lang="ts">
import { useCartStore } from '../../stores/cartStore';
import { useCurrency } from '../../composables/useCurrency';

const cartStore = useCartStore();
const { formatRupiah } = useCurrency();
</script>

<template>
	<div
		v-if="cartStore.isDrawerOpen"
		class="fixed inset-0 z-50 flex justify-end"
	>
		<div
			class="absolute inset-0 bg-black/60 transition-opacity backdrop-blur-sm"
			@click="cartStore.toggleDrawer()"
		></div>

		<div
			class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300"
		>
			<div
				class="p-6 border-b-2 border-gray-100 flex justify-between items-center bg-gradient-to-r from-secondary-light to-gray-50"
			>
				<div>
					<h2
						class="text-xl font-black text-secondary-dark flex items-center gap-2"
					>
						Order Summary
					</h2>
					<div class="flex items-center gap-2 mt-1">
						<span
							class="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full"
							>{{ cartStore.totalItems }} Items</span
						>
						<span class="text-xs text-gray-500">in your cart</span>
					</div>
				</div>
				<button
					@click="cartStore.toggleDrawer()"
					class="text-gray-400 hover:text-primary hover:bg-gray-100 transition-all p-2 rounded-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="flex-1 overflow-y-auto p-5 space-y-3">
				<div
					v-if="cartStore.items.length === 0"
					class="flex flex-col items-center justify-center h-full text-center text-gray-400 px-6"
				>
					<div class="bg-gray-50 rounded-full p-6 mb-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-16 w-16 opacity-50"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
					<p class="font-bold text-xl text-gray-600">Cart Empty</p>
					<p class="text-sm mb-6">There is no product added</p>
					<button
						@click="cartStore.toggleDrawer()"
						class="text-primary font-bold text-sm hover:underline flex items-center gap-1 hover:gap-2 transition-all"
					>
						Order steel products now
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</button>
				</div>

				<div
					v-else
					v-for="item in cartStore.items"
					:key="item.id"
					class="flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
				>
					<div
						class="w-20 h-20 flex-shrink-0 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
					>
						<img
							:src="item.image"
							:alt="item.name"
							class="w-full h-full object-cover"
						/>
					</div>

					<div class="flex-1 flex flex-col justify-between min-w-0">
						<div>
							<h3
								class="text-sm font-bold text-secondary-dark line-clamp-2 leading-tight"
							>
								{{ item.name }}
							</h3>
							<p class="text-xs text-gray-500 mt-1.5">
								SKU: {{ item.sku }}
							</p>
						</div>

						<div class="flex justify-between items-end mt-2">
							<p class="text-primary font-black text-lg">
								{{ formatRupiah(item.price) }}
							</p>

							<div
								class="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden h-9 shadow-sm"
							>
								<button
									@click="cartStore.decreaseQuantity(item.id)"
									class="w-9 h-full flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold border-r-2 border-gray-300 transition-colors active:bg-gray-300"
								>
									−
								</button>
								<div
									class="w-11 h-full flex items-center justify-center text-sm font-bold bg-white"
								>
									{{ item.quantity }}
								</div>
								<button
									@click="cartStore.addToCart(item)"
									class="w-9 h-full flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold border-l-2 border-gray-300 transition-colors active:bg-gray-300"
								>
									+
								</button>
							</div>
						</div>
					</div>

					<button
						@click="cartStore.removeItem(item.id)"
						class="text-gray-400 hover:text-red-500 self-start hover:bg-red-50 p-1.5 rounded-lg transition-all"
						title="Remove Item"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div
				v-if="cartStore.items.length > 0"
				class="p-6 bg-gradient-to-t from-gray-50 to-white border-t-2 border-gray-200"
			>
				<div
					class="bg-white rounded-xl p-4 mb-4 border-2 border-gray-200 shadow-sm"
				>
					<div class="flex justify-between items-center">
						<span
							class="text-secondary font-bold text-sm uppercase tracking-wide"
							>Subtotal</span
						>
						<span class="text-3xl font-black text-secondary-dark">{{
							formatRupiah(cartStore.totalPrice)
						}}</span>
					</div>
				</div>
				<p
					class="text-xs text-gray-500 mb-5 text-center bg-yellow-50 py-2 px-3 rounded-lg border border-yellow-100"
				>
					💡 Purchaser details will be filled at checkout
				</p>

				<button
					@click="cartStore.toggleCheckout()"
					class="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2"
				>
					Proceed to Checkout
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>
