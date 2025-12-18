import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Dompet Pintar - Kelola Uang Jadi Mudah" />
            
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
                
                {/* --- 1. NAVBAR (Sticky & Glassmorphism) --- */}
                <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                        {/* Logo Brand */}
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
                                Dompet<span className="text-indigo-600">Pintar</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#fitur" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Fitur</a>
                            <a href="#cara-kerja" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Cara Kerja</a>
                            <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">FAQ</a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                >
                                    Dashboard &rarr;
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hidden md:block text-sm font-bold text-slate-600 hover:text-indigo-600 transition"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* --- 2. HERO SECTION --- */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    {/* Background Blobs (Abstract Decoration) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-[100px] animate-pulse-slow"></div>
                        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-indigo-200/50 rounded-full blur-[80px] animate-pulse-slow delay-1000"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
                                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                                New App Release v1.0
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 animate-fade-in-up delay-100">
                                Atur Keuangan <br className="hidden lg:block"/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                                    Tanpa Pusing.
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
                                Tinggalkan catatan kertas. Dompet Pintar membantu kamu mencatat pemasukan & pengeluaran harian dengan fitur analitik cerdas, gratis selamanya.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center"
                                >
                                    Mulai Sekarang
                                </Link>
                                <a
                                    href="#fitur"
                                    className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 text-center flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                    Pelajari Dulu
                                </a>
                            </div>

                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 animate-fade-in-up delay-500">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Gratis
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Tanpa Iklan
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Data Aman
                                </div>
                            </div>
                        </div>

                        {/* Visual Illustration (CSS Only - No Images Needed) */}
                        <div className="relative animate-float hidden lg:block">
                            {/* Card Utama */}
                            <div className="relative z-20 bg-white/90 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl transform rotate-[-2deg] max-w-md mx-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Total Saldo</p>
                                        <h3 className="text-3xl font-extrabold text-slate-800">Rp 12.500.000</h3>
                                    </div>
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                    </div>
                                </div>
                                {/* Dummy Chart Bars */}
                                <div className="flex items-end justify-between gap-2 h-32 mb-6">
                                    <div className="w-full bg-indigo-50 rounded-t-lg h-[40%]"></div>
                                    <div className="w-full bg-indigo-100 rounded-t-lg h-[60%]"></div>
                                    <div className="w-full bg-indigo-200 rounded-t-lg h-[30%]"></div>
                                    <div className="w-full bg-indigo-600 rounded-t-lg h-[80%] shadow-lg shadow-indigo-200"></div>
                                    <div className="w-full bg-indigo-100 rounded-t-lg h-[50%]"></div>
                                </div>
                                {/* Dummy List */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center text-xs">🍔</div>
                                            <div className="text-sm font-bold text-gray-700">Makan Siang</div>
                                        </div>
                                        <div className="text-sm font-bold text-red-500">- Rp 50.000</div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-500 flex items-center justify-center text-xs">💰</div>
                                            <div className="text-sm font-bold text-gray-700">Uang Saku</div>
                                        </div>
                                        <div className="text-sm font-bold text-green-500">+ Rp 500.000</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements (Visual Candy) */}
                            <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl z-30 animate-float animation-delay-2000">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Hemat</p>
                                        <p className="font-bold text-gray-800">25%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 3. STATS SECTION (Trust) --- */}
                <div className="border-y border-gray-100 bg-white">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <h3 className="text-4xl font-extrabold text-indigo-600 mb-1">3k+</h3>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pengguna</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-extrabold text-indigo-600 mb-1">10jt+</h3>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Transaksi Dicatat</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-extrabold text-indigo-600 mb-1">4.9</h3>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Rating App</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-extrabold text-indigo-600 mb-1">24/7</h3>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Uptime</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 4. FEATURES GRID --- */}
                <section id="fitur" className="py-24 bg-gray-50 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Fitur Unggulan</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Semua yang Kamu Butuhkan</h3>
                            <p className="text-lg text-gray-500">Kami merancang Dompet Pintar agar simpel digunakan tapi powerful untuk memantau kesehatan finansialmu.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Analisis Visual</h4>
                                <p className="text-gray-500 leading-relaxed">
                                    Lihat kemana uangmu pergi dengan grafik visual yang mudah dimengerti. Stop boros sekarang.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Akses Offline (PWA)</h4>
                                <p className="text-gray-500 leading-relaxed">
                                    Install aplikasinya di HP kamu. Buka dan catat transaksi kapan saja walau tanpa internet.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Kategori Fleksibel</h4>
                                <p className="text-gray-500 leading-relaxed">
                                    Pisahkan pengeluaran Makan, Transport, Sewa, atau Hiburan agar keuangan lebih terorganisir.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 5. HOW IT WORKS (Steps) --- */}
                <section id="cara-kerja" className="py-24 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                         <div className="flex flex-col md:flex-row items-center gap-16">
                            {/* Left Image (Abstract) */}
                            <div className="w-full md:w-1/2 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl rotate-3 opacity-20 blur-lg"></div>
                                <div className="relative bg-white border border-gray-100 p-8 rounded-3xl shadow-2xl">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                                            <div>
                                                <h5 className="font-bold text-gray-900">Daftar Akun</h5>
                                                <p className="text-sm text-gray-500">Cukup pakai email, gratis.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                                            <div>
                                                <h5 className="font-bold text-gray-900">Catat Transaksi</h5>
                                                <p className="text-sm text-gray-500">Input pemasukan & pengeluaranmu.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                                            <div>
                                                <h5 className="font-bold text-gray-900">Analisis Data</h5>
                                                <p className="text-sm text-gray-500">Lihat grafik keuanganmu.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Mudah Digunakan,<br/>Bahkan untuk Pemula</h2>
                                <p className="text-lg text-gray-500 mb-8">
                                    Tidak perlu jago akuntansi. Dompet Pintar dirancang dengan antarmuka yang intuitif. Cukup klik, ketik, dan simpan. Biarkan sistem kami yang merapikannya untuk Anda.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                        Tampilan bersih dan tidak membingungkan
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                        Bisa diakses dari HP, Tablet, dan Laptop
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                        Dukungan mata uang Rupiah (IDR)
                                    </li>
                                </ul>
                            </div>
                         </div>
                    </div>
                </section>

                {/* --- 6. CTA (Call to Action) --- */}
                <section className="py-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                            {/* Decorative Circles */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Merapikan Keuanganmu?</h2>
                                <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                                    Bergabunglah dengan ribuan pengguna cerdas lainnya. Mulai perjalanan finansial yang lebih sehat hari ini.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-block px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                    Buat Akun Gratis Sekarang
                                </Link>
                                <p className="mt-6 text-sm text-slate-500">Tidak perlu kartu kredit. 100% Gratis.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 7. FOOTER --- */}
                <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-4 gap-12 mb-12">
                            <div className="col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <span className="font-bold text-xl text-slate-800">Dompet Pintar</span>
                                </div>
                                <p className="text-gray-500 max-w-xs leading-relaxed">
                                    Aplikasi pencatatan keuangan pribadi berbasis web yang membantu Anda mengelola arus kas dengan lebih bijak.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">Produk</h4>
                                <ul className="space-y-2 text-gray-500">
                                    <li><a href="#" className="hover:text-indigo-600 transition">Fitur</a></li>
                                    <li><a href="#" className="hover:text-indigo-600 transition">Harga</a></li>
                                    <li><a href="#" className="hover:text-indigo-600 transition">PWA</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">Perusahaan</h4>
                                <ul className="space-y-2 text-gray-500">
                                    <li><a href="#" className="hover:text-indigo-600 transition">Tentang Kami</a></li>
                                    <li><a href="#" className="hover:text-indigo-600 transition">Kebijakan Privasi</a></li>
                                    <li><a href="#" className="hover:text-indigo-600 transition">Hubungi Kami</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm">© 2025 Dompet Pintar App. All rights reserved.</p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-indigo-600 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                                <a href="#" className="text-gray-400 hover:text-indigo-600 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>

            {/* --- CUSTOM CSS ANIMATIONS --- */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(-2deg); }
                    50% { transform: translateY(-20px) rotate(0deg); }
                    100% { transform: translateY(0px) rotate(-2deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite;
                }

                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-1000 { animation-delay: 1s; }
                .delay-2000 { animation-delay: 2s; }

                /* Smooth Scrolling */
                html { scroll-behavior: smooth; }
            `}</style>
        </>
    );
}