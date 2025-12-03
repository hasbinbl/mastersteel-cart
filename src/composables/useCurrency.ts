export function useCurrency() {
	const formatRupiah = (value: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(value);
	};

	return {
		formatRupiah,
	};
}
