export interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
	image: string;
	stock: number;
	sku: string;
}

export interface CartItem extends Product {
	quantity: number;
}
