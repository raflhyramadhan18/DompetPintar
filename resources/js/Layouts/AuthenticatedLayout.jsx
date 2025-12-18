import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import useDarkMode from '@/Hooks/useDarkMode'; // <--- IMPORT HOOK BARU

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // --- LOGIC DARK MODE ---
    const [colorTheme, setTheme] = useDarkMode();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
    // -----------------------

    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    const openLogoutModal = (e) => {
        e.preventDefault();
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    const handleLogout = () => {
        router.post(route('logout'));
        setIsLogoutModalOpen(false);
    };

    return (
        // --- UPDATE: Tambahkan 'dark:bg-slate-900' ---
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans relative transition-colors duration-300">
            
            {/* LOGOUT MODAL */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
                        onClick={closeLogoutModal}
                    ></div>
                    {/* Update Modal ke Dark Mode */}
                    <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100 animate-blob">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4 ring-4 ring-rose-50/50 dark:ring-rose-900/20">
                                <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            
                            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Keluar Aplikasi?</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-6 leading-relaxed">
                                Apakah kamu yakin ingin mengakhiri sesi ini? Kamu harus login ulang untuk mengakses data.
                            </p>
                            
                            <div className="flex gap-3 w-full">
                                <button 
                                    onClick={closeLogoutModal} 
                                    className="flex-1 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleLogout} 
                                    className="flex-1 py-3 px-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all hover:-translate-y-0.5"
                                >
                                    Ya, Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* NAVBAR */}
            <nav className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 sticky top-0 z-40 shadow-sm/50 transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2 group">
                                    <ApplicationLogo className="block h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
                                    <span className="font-extrabold text-xl text-slate-800 dark:text-white tracking-tight hidden md:block">
                                        Dompet<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Pintar</span>
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</NavLink>
                                <NavLink href={route('stats')} active={route().current('stats')}>Statistik</NavLink>
                                <NavLink href={route('export')} active={route().current('export')}>Laporan</NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-4">
                            
                            {/* --- TOMBOL TOGGLE DARK MODE --- */}
                            <button 
                                onClick={() => toggleDarkMode(!darkSide)} 
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                title="Ganti Tema"
                            >
                                {colorTheme === 'light' ? (
                                    // Ikon Matahari (Aktif saat mode Dark, klik untuk jadi Light)
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    // Ikon Bulan (Aktif saat mode Light, klik untuk jadi Dark)
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="group inline-flex items-center gap-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1 pl-1 pr-4 text-sm font-bold leading-4 text-slate-600 dark:text-slate-300 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 focus:outline-none">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
                                                    {getInitials(user.name)}
                                                </div>
                                                <span className="hidden md:inline-block">{user.name.split(' ')[0]}</span>
                                                <svg className="-me-0.5 ms-1 h-4 w-4 text-slate-400 group-hover:text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                                            <p className="text-xs text-gray-500 dark:text-slate-400">Login sebagai</p>
                                            <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{user.email}</p>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')}>Profile Settings</Dropdown.Link>
                                        <Dropdown.Link as="button" onClick={openLogoutModal} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 w-full text-left">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown((previousState) => !previousState)} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-500 focus:bg-gray-100 dark:focus:bg-slate-700 focus:text-gray-500 focus:outline-none">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('stats')} active={route().current('stats')}>Statistik</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('export')} active={route().current('export')}>Laporan</ResponsiveNavLink>
                        
                        {/* Mobile Dark Mode Toggle */}
                        <button onClick={() => toggleDarkMode(!darkSide)} className="w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition duration-150 ease-in-out flex items-center gap-2">
                            <span>{colorTheme === 'light' ? '☀️ Ganti ke Light Mode' : '🌙 Ganti ke Dark Mode'}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-slate-800 shadow transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {/* Pakai 'dark:text-white' di header children nanti */}
                        <div className="dark:text-white transition-colors duration-300">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}