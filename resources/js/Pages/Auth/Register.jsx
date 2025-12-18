import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex bg-white selection:bg-indigo-500 selection:text-white">
            <Head title="Daftar - Dompet Pintar" />

            {/* --- BAGIAN KIRI: ARTWORK (Dibalik, Artwork di Kiri untuk Register) --- */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 opacity-90"></div>
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-lg text-center p-10">
                    <h3 className="text-4xl font-extrabold text-white mb-6">Bergabung dengan <br/><span className="text-indigo-400">10,000+</span> Pengguna Cerdas</h3>
                    <ul className="text-left space-y-4 text-slate-300 mx-auto max-w-xs">
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">✓</div>
                            <span>Akses fitur lengkap gratis</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">✓</div>
                            <span>Analisis keuangan otomatis</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">✓</div>
                            <span>Aman dan Terenkripsi</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- BAGIAN KANAN: FORM --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md space-y-6">
                    
                    <div className="text-center lg:text-left">
                         <Link href="/" className="flex justify-center lg:justify-start items-center gap-2 mb-2 group">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <span className="font-bold text-xl text-gray-800">Dompet<span className="text-indigo-600">Pintar</span></span>
                        </Link>
                        <h2 className="text-3xl font-extrabold text-gray-900 mt-6">Buat Akun Baru</h2>
                        <p className="mt-2 text-sm text-gray-500">Hanya butuh 1 menit untuk memulai.</p>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all outline-none"
                                placeholder="Jhon Doe"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all outline-none"
                                placeholder="nama@email.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all outline-none"
                                placeholder="Minimal 8 karakter"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all outline-none"
                                placeholder="Ulangi password tadi"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            {errors.password_confirmation && <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 mt-4 disabled:opacity-70"
                        >
                            {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="font-bold text-indigo-600 hover:text-indigo-800 transition">
                                Masuk disini
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}