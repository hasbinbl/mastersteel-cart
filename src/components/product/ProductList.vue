<script setup lang="ts">
import { ref, computed } from 'vue';
import { products } from '../../data/products';
import ProductCard from './ProductCard.vue';

const INITIAL_LOAD = 8;
const LOAD_STEP = 4;

const limit = ref(INITIAL_LOAD);
const isLoadingMore = ref(false);

const visibleProducts = computed(() => {
	return products.slice(0, limit.value);
});

const hasMore = computed(() => {
	return limit.value < products.length;
});

const handleLoadMore = async () => {
	isLoadingMore.value = true;

	await new Promise((resolve) => setTimeout(resolve, 800));

	limit.value += LOAD_STEP;
	isLoadingMore.value = false;
};
</script>

<template>
	<div class="container mx-auto px-4 sm:px-6 py-10 pb-24">
		<div class="mb-10 pb-6 border-b-2 border-gray-200">
			<h2
				class="text-3xl sm:text-4xl font-black text-secondary-dark tracking-tight"
			>
				Product Catalog
			</h2>
			<p class="text-gray-500 mt-1 text-sm sm:text-base">
				Select steel materials for your project requirements
			</p>
		</div>

		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 mb-12"
		>
			<ProductCard
				v-for="product in visibleProducts"
				:key="product.id"
				:product="product"
			/>
		</div>

		<div v-if="hasMore" class="flex justify-center">
			<button
				@click="handleLoadMore"
				:disabled="isLoadingMore"
				class="bg-white border-2 border-gray-300 text-secondary-dark font-bold py-3.5 px-10 rounded-xl shadow-sm hover:shadow-lg hover:border-primary hover:text-primary transition-all duration-200 flex items-center gap-3 disabled:opacity-70 disabled:cursor-wait group"
			>
				<svg
					v-if="isLoadingMore"
					class="animate-spin h-5 w-5 text-primary"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>

				<svg
					v-else
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/>
				</svg>

				<span v-if="isLoadingMore">Loading Products</span>
				<span v-else>Load More</span>
			</button>
		</div>

		<div v-else class="text-center text-gray-400 text-sm mt-10 py-4">
			<div class="inline-flex items-center gap-2">
				<div class="h-px w-12 bg-gray-300"></div>
				<p class="font-medium">All products loaded</p>
				<div class="h-px w-12 bg-gray-300"></div>
			</div>
		</div>
	</div>
</template>
