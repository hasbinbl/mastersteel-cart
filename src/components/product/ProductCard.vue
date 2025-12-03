<script setup lang="ts">
import type { Product } from '../../types';
import { useCurrency } from '../../composables/useCurrency';
import { useCartStore } from '../../stores/cartStore';

const props = defineProps<{
	product: Product;
}>();

const { formatRupiah } = useCurrency();
const cartStore = useCartStore();

const handleAddToCart = () => {
	cartStore.addToCart(props.product);
};
</script>

<template>
	<div
		class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group"
	>
		<div class="relative h-48 bg-gray-100 overflow-hidden">
			<span
				class="absolute top-2 left-2 bg-secondary-dark text-white text-xs font-bold px-2 py-1 rounded-lg z-10"
			>
				{{ product.category }}
			</span>

			<img
				:src="product.image"
				:alt="product.name"
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			/>

			<div
				class="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
			>
				SKU: {{ product.sku }}
			</div>
		</div>

		<div class="p-4 flex flex-col flex-grow">
			<h3
				class="text-secondary-dark font-bold text-lg leading-tight mb-1 line-clamp-2"
			>
				{{ product.name }}
			</h3>

			<p class="text-primary font-black text-xl mb-4">
				{{ formatRupiah(product.price) }}
			</p>

			<div class="mt-auto mb-3 flex items-center text-xs text-gray-500">
				<span
					class="w-2 h-2 rounded-full mr-2"
					:class="product.stock > 0 ? 'bg-green-500' : 'bg-red-500'"
				></span>
				<span>Stock: {{ product.stock }} units available</span>
			</div>

			<button
				@click="handleAddToCart"
				:disabled="product.stock === 0"
				class="w-full bg-secondary-dark text-white font-semibold py-2 px-4 rounded-xl hover:bg-primary transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
			>
				<span v-if="product.stock > 0">+ Add to Order</span>
				<span v-else>Out of Stock</span>
			</button>
		</div>
	</div>
</template>
