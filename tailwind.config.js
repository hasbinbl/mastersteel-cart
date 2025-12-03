/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#901C25',
					hover: '#75131B',
				},
				secondary: {
					DEFAULT: '#64748B',
					dark: '#334155',
					light: '#F1F5F9',
				},
				dark: {
					DEFAULT: '#1E293B',
				},
			},
		},
	},
	plugins: [],
};
