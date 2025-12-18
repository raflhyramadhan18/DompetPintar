<link rel="icon" type="image/png" href="/logo.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#16a34a">

<div id="app-loader-container">
    <img src="/logo.svg" alt="Logo" class="logo-icon">
    <div style="color: #16a34a; font-weight: 500;">Memuat aplikasi...</div>
</div>

<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register("/sw.js") // Langsung ke root
                .then(reg => console.log('SW Registered'))
                .catch(err => console.error('SW Error', err));
        });
    }
</script>