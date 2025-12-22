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
            outDir: 'public/build', 
            includeAssets: ['favicon.ico', 'logo.png', 'robots.txt'], 
            manifest: {
                name: 'Dompet Pintar App',
                short_name: 'DompetKu',
                description: 'Aplikasi pencatat keuangan pribadi',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/logo.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/logo.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                // Modifikasi di sini agar support offline refresh di Vercel/Laravel
                navigateFallback: '/', 
                globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
                cleanupOutdatedCaches: true,
                // Runtime caching untuk memastikan aset tetap ada
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.mode === 'navigate',
                        handler: 'NetworkFirst', // Coba ambil network dulu, kalau gagal ambil cache (offline)
                    },
                ],
            }
        })
    ],
});