import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// 1. Import PWA Register disini
import { registerSW } from 'virtual:pwa-register'; 

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// 2. Kode Register PWA ditaruh di paling bawah
registerSW({
    onRegistered(r) {
        // Cek update service worker setiap 1 jam (60 * 60 * 1000 ms)
        r && setInterval(() => {
            r.update();
        }, 60 * 60 * 1000);
    }
});