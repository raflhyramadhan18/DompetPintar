<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" type="image/svg+xml" href="{{ asset('logo.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('logo.png') }}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        
        <link rel="manifest" href="{{ asset('manifest.webmanifest') }}">
        <meta name="theme-color" content="#16a34a">

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        
        <style>
            /* Loader Screen */
            #app-loader-container {
                position: fixed;
                inset: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #f0fdf4; 
                z-index: 9999;
                transition: opacity 0.5s ease, visibility 0.5s;
            }
            .logo-icon {
                width: 80px;
                height: 80px;
                margin-bottom: 1rem;
            }
            .loader-hidden {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia

        <div id="app-loader-container">
            <img src="{{ asset('logo.svg') }}" alt="Logo" class="logo-icon">
            <div style="color: #16a34a; font-weight: 500; font-family: 'Figtree', sans-serif;">Memuat aplikasi...</div>
        </div>

        <script>
            function hideLoader() {
                const loader = document.getElementById('app-loader-container');
                if (loader) {
                    loader.classList.add('loader-hidden');
                }
            }

            // Sembunyikan loader saat Inertia siap
            document.addEventListener('inertia:finish', hideLoader, { once: true });
            
            window.addEventListener('load', () => {
                setTimeout(hideLoader, 2000); 
            });

            // Service Worker registration
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    // Karena sudah di public, panggil tanpa path build
                    navigator.serviceWorker.register("{{ asset('sw.js') }}")
                        .then(reg => console.log('ServiceWorker aktif di folder public'))
                        .catch(err => console.log('ServiceWorker gagal', err));
                });
            }
        </script>
    </body>
</html>