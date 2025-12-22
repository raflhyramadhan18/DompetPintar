import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // <--- Import ini

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        // --- Settingan PWA Mulai Disini ---
        VitePWA({
            registerType: 'autoUpdate',
            outDir: 'public/build',
            manifest: {
                name: 'Dompet Pintar App',
                short_name: 'DompetKu',
                description: 'Aplikasi pencatat keuangan pribadi',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/logo.png', // Kita akan pakai 1 logo aja biar simpel
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/logo.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
        // --- Settingan PWA Selesai ---
    ],
});