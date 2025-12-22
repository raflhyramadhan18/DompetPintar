import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            outDir: 'public/build', // Memastikan SW masuk ke folder build Laravel
            workbox: {
                // Konfigurasi agar file statis (JS, CSS, Gambar) tersimpan otomatis
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                
                // STRATEGI OFFLINE: Menangani request halaman Inertia/Laravel
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) => url.origin === self.location.origin,
                        handler: 'NetworkFirst', // Coba internet dulu, kalau gagal ambil dari cache
                        options: {
                            cacheName: 'app-pages',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // Tersimpan selama 30 hari
                            },
                        },
                    },
                ],
            },
            manifest: {
                name: 'Dompet Pintar App',
                short_name: 'DompetKu',
                description: 'Aplikasi pencatat keuangan pribadi',
                theme_color: '#4B5563', // Menggunakan warna tema abu-abu gelap sesuai app.css
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: '/logo.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: '/logo.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
});