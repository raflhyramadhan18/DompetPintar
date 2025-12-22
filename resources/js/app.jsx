import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-create-root';
import { useState, useEffect } from 'react'; // <--- Tambah import ini
import { registerSW } from 'virtual:pwa-register'; 

const appName = 'Dompet Pintar'; 

// --- Komponen Pembungkus untuk Deteksi Offline ---
const OfflineWrapper = ({ children }) => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleStatus = () => setIsOffline(!navigator.onLine);
        window.addEventListener('online', handleStatus);
        window.addEventListener('offline', handleStatus);
        return () => {
            window.removeEventListener('online', handleStatus);
            window.removeEventListener('offline', handleStatus);
        };
    }, []);

    return (
        <div className="relative">
            {isOffline && (
                <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-[9999] shadow-md font-bold">
                    ⚠️ Anda sedang offline. Data mungkin tidak sinkron.
                </div>
            )}
            {children}
        </div>
    );
};
// ----------------------------------------------

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // Bungkus App dengan OfflineWrapper agar muncul di semua halaman
        root.render(
            <OfflineWrapper>
                <App {...props} />
            </OfflineWrapper>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

registerSW({
    onRegistered(r) {
        r && setInterval(() => {
            r.update();
        }, 60 * 60 * 1000);
    }
});