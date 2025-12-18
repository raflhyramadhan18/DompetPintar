<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" type="image/svg+xml" href="{{ asset('logo.svg') }}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="manifest" href="{{ asset('manifest.webmanifest') }}">
    
    <meta name="theme-color" content="#16a34a">
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <link rel="manifest" href="{{ asset('build/manifest.webmanifest') }}">
        
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
                transition: opacity 0.5s ease;
            }
            .logo-icon {
                width: 80px;
                height: 80px;
                margin-bottom: 1rem;
            }
            body.loaded #app-loader-container {
                opacity: 0;
                pointer-events: none;
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia

        <div id="app-loader-container">
            <img src="{{ asset('logo.svg') }}" alt="Logo" class="logo-icon">
            <div style="color: #16a34a; font-weight: 500;">Memuat aplikasi...</div>
        </div>

        <script>
            // Menghilangkan loader setelah konten muncul
            document.addEventListener('inertia:finish', function() {
                setTimeout(() => {
                    document.body.classList.add('loaded');
                }, 500);
            });

            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register("{{ asset('build/sw.js') }}").then(function(registration) {
                        console.log('ServiceWorker registration successful');
                    });
                });
            }
        </script>
    </body>
</html>