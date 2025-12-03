# Master Steel - Cart System

Aplikasi ini mensimulasikan alur pemilihan produk, cart, hingga proses checkout sederhana.

🔗 **Live Demo:** [\[Netlify\]](https://cart-hasbinbl.netlify.app/)

## 🛠 Tech Stack

-   **Framework:** Vue 3
-   **Language:** TypeScript
-   **State Management:** Pinia
-   **Styling:** Tailwind CSS 3
-   **Build Tool:** Vite

## ✨ Fitur Utama

-   **Product Catalog:** Menampilkan daftar produk baja (Besi Beton, Wire Rod, dll) dengan sistem _Lazy Load / Load More_ untuk simulasi data besar.
-   **Cart Management:**
    -   Add to Cart.
    -   Cart Drawer (Side panel).
    -   Adjust Quantity & Remove Item.
    -   Real-time calculation (Subtotal & Total Items).
-   **Data Persistency:** Menggunakan `LocalStorage` agar data keranjang tidak hilang saat page refresh.
-   **Checkout Simulation:**
    -   Modal Form dengan validasi input sederhana.
    -   Simulasi _Asynchronous Process_ (Loading state).
    -   Feedback visual (Success Message & Order ID generation).
-   **Responsive Design:** Tampilan adaptif untuk Mobile dan Desktop.

## 📂 Struktur Project

Project ini menerapkan _Separation of Concerns_ untuk menjaga kerapian kode:

```text
src/
├── components/      # UI Components (Reusable)
│   ├── cart/        # Komponen spesifik keranjang (Drawer, Modal)
│   ├── product/     # Komponen spesifik produk (Card, List)
│   └── ...
├── composables/     # Shared Logic / Hooks (e.g., useCurrency)
├── data/            # Mock Data (Simulasi Database Produk)
├── stores/          # Global State Management (Pinia Cart Store)
├── types/           # TypeScript Interfaces & Definitions
└── views/           # Halaman Utama
```
