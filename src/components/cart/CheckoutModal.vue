<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useCartStore } from '../../stores/cartStore';
import { useCurrency } from '../../composables/useCurrency';

const cartStore = useCartStore();
const { formatRupiah } = useCurrency();

const form = reactive({
	name: '',
	email: '',
	notes: '',
});

const isLoading = ref(false);
const isSuccess = ref(false);
const orderId = ref('');

const handleSubmit = async () => {
	isLoading.value = true;

	orderId.value = 'MS-' + Math.floor(Math.random() * 100000);

	await cartStore.checkout({
		name: form.name,
		email: form.email,
	});

	isLoading.value = false;
	isSuccess.value = true;

	setTimeout(() => {
		closeModal();
	}, 3000);
};

const closeModal = () => {
	cartStore.toggleCheckout();
	// Delay reset state agar tidak "glitch" saat animasi tutup
	setTimeout(() => {
		isSuccess.value = false;
		form.name = '';
		form.email = '';
		form.notes = '';
	}, 300);
};
</script>

<template>
	<div
		v-if="cartStore.isCheckoutOpen"
		class="fixed inset-0 z-[60] flex items-center justify-center p-4"
	>
		<div
			class="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
			@click="closeModal"
		></div>

		<div
			class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border-2 border-gray-100"
		>
			<form v-if="!isSuccess" @submit.prevent="handleSubmit">
				<div class="p-7">
					<div class="flex justify-between items-start mb-6">
						<div>
							<h2
								class="text-3xl font-black text-secondary-dark uppercase tracking-tight"
							>
								Checkout
							</h2>
							<p class="text-xs text-gray-500 mt-1 font-medium">
								Complete your order details
							</p>
						</div>
						<button
							type="button"
							@click="closeModal"
							class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
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

					<div
						class="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl mb-6 border-2 border-gray-200 shadow-sm"
					>
						<div class="flex justify-between items-start mb-2">
							<div>
								<p
									class="text-gray-600 text-xs font-bold uppercase tracking-wide"
								>
									Total Order
								</p>
								<p
									class="text-3xl font-black text-primary mt-1"
								>
									{{ formatRupiah(cartStore.totalPrice) }}
								</p>
							</div>
							<div class="text-right">
								<div
									class="bg-white px-3 py-1.5 rounded-full border-2 border-gray-200 shadow-sm"
								>
									<p
										class="text-xs text-gray-500 font-medium"
									>
										<span
											class="font-bold text-secondary-dark"
											>{{ cartStore.totalItems }}</span
										>
										Items
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="space-y-4">
						<div>
							<label
								class="block text-sm font-bold text-gray-700 mb-2"
							>
								<span class="flex items-center gap-1">
									Company / PIC Name
									<span class="text-red-500">*</span>
								</span>
							</label>
							<input
								v-model="form.name"
								type="text"
								class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
								placeholder="PT Kontraktor Maju Jaya"
								required
							/>
						</div>
						<div>
							<label
								class="block text-sm font-bold text-gray-700 mb-2"
							>
								<span class="flex items-center gap-1">
									Email Address
									<span class="text-red-500">*</span>
								</span>
							</label>
							<input
								v-model="form.email"
								required
								type="email"
								class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
								placeholder="purchasing@example.com"
							/>
						</div>
						<div>
							<label
								class="block text-sm font-bold text-gray-700 mb-2"
								>Notes (Optional)</label
							>
							<textarea
								v-model="form.notes"
								rows="3"
								class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
								placeholder="Delivery via the Cikarang warehouse"
							></textarea>
						</div>
					</div>

					<div class="mt-7 flex gap-3">
						<button
							type="button"
							@click="closeModal"
							class="flex-1 py-3.5 px-4 border-2 border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
						>
							Cancel
						</button>
						<button
							type="submit"
							:disabled="isLoading"
							class="flex-1 py-3.5 px-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-lg hover:shadow-xl flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-wait transition-all active:scale-95"
						>
							<svg
								v-if="isLoading"
								class="animate-spin h-5 w-5"
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
							<span v-if="isLoading">Processing</span>
							<span v-else>Confirm Order</span>
						</button>
					</div>
				</div>
			</form>

			<div
				v-else
				class="p-12 text-center bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center"
			>
				<div
					class="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-6 shadow-lg"
				>
					<svg
						class="w-12 h-12 text-green-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M5 13l4 4L19 7"
						></path>
					</svg>
				</div>
				<h3 class="text-3xl font-black text-secondary-dark mb-3">
					Order Successful!
				</h3>
				<p class="text-gray-600 mb-6 leading-relaxed max-w-sm">
					Thank You. Your order is recieved by our system.
				</p>
				<div
					class="bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-3 rounded-xl border-2 border-gray-300 shadow-sm"
				>
					<p
						class="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1"
					>
						Order ID
					</p>
					<p class="text-lg font-mono font-bold text-gray-700">
						{{ orderId }}
					</p>
				</div>
				<div class="mt-8 flex items-center gap-2 text-xs text-gray-400">
					<svg
						class="animate-spin h-4 w-4"
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
					<p>Window will close automatically</p>
				</div>
			</div>
		</div>
	</div>
</template>
