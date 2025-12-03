import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { CartItem, Product } from '../types';

export const useCartStore = defineStore('cart', () => {
	const items = ref<CartItem[]>([]);
	const isDrawerOpen = ref(false);
	const isCheckoutOpen = ref(false);

	const totalItems = computed(() => {
		return items.value.reduce((sum, item) => sum + item.quantity, 0);
	});

	const totalPrice = computed(() => {
		return items.value.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
	});

	function addToCart(product: Product) {
		const existingItem = items.value.find((item) => item.id === product.id);

		if (existingItem) {
			existingItem.quantity++;
		} else {
			items.value.push({ ...product, quantity: 1 });
		}

		isDrawerOpen.value = true;
		saveToLocalStorage();
	}

	function decreaseQuantity(productId: number) {
		const item = items.value.find((item) => item.id === productId);

		if (item) {
			if (item.quantity > 1) {
				item.quantity--;
			} else {
				const indexToDelete = items.value.findIndex(
					(i) => i.id === productId
				);

				if (indexToDelete !== -1) items.value.splice(indexToDelete, 1);
			}

			saveToLocalStorage();
		}
	}

	function removeItem(productId: number) {
		items.value = items.value.filter((item) => item.id !== productId);
		saveToLocalStorage();
	}

	function clearCart() {
		items.value = [];
		saveToLocalStorage();
	}

	function toggleDrawer() {
		isDrawerOpen.value = !isDrawerOpen.value;
	}

	function saveToLocalStorage() {
		localStorage.setItem('mastersteel-cart', JSON.stringify(items.value));
	}

	function loadFromLocalStorage() {
		const data = localStorage.getItem('mastersteel-cart');

		if (data) {
			items.value = JSON.parse(data);
		}
	}

	function toggleCheckout() {
		isCheckoutOpen.value = !isCheckoutOpen.value;

		if (isCheckoutOpen.value) {
			isDrawerOpen.value = false;
		}
	}

	async function checkout(customerData: { name: string; email: string }) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Processing order for:', customerData);
				console.log('Items:', items.value);

				clearCart();
				resolve(true);
			}, 2000);
		});
	}

	loadFromLocalStorage();

	return {
		items,
		isDrawerOpen,
		isCheckoutOpen,
		totalItems,
		totalPrice,
		addToCart,
		decreaseQuantity,
		removeItem,
		clearCart,
		toggleDrawer,
		toggleCheckout,
		checkout,
	};
});
