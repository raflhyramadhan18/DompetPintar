import { useEffect, useState } from 'react';

export default function useDarkMode() {
    // Cek LocalStorage atau Preferensi Sistem saat pertama kali load
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;

        // Hapus class lama, tambah class baru
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        // Simpan ke LocalStorage biar browser ingat
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}