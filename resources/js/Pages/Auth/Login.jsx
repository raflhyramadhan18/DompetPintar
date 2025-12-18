import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex bg-white selection:bg-indigo-500 selection:text-white">
            <Head title="Masuk - Dompet Pintar" />

            {/* --- BAGIAN KIRI: FORM --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    
                    {/* Header Form */}
                    <div className="text-center lg:text-left">
                        <Link href="/" className="flex justify-center lg:justify-start items-center gap-2 mb-2 group">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <span className="font-bold text-xl text-gray-800">Dompet<span className="text-indigo-600">Pintar</span></span>
                        </Link>
                        <h2 className="text-3xl font-extrabold text-gray-900 mt-6">Selamat Datang Kembali!</h2>
                        <p className="mt-2 text-sm text-gray-500">Silakan masuk untuk mengelola keuanganmu.</p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600 p-3 bg-green-50 rounded-lg">{status}</div>}

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            {/* Email Input */}
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

                            {/* Password Input */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all outline-none"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Ingat saya di perangkat ini</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Memproses...' : 'Masuk Sekarang'}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="font-bold text-indigo-600 hover:text-indigo-800 transition">
                                Daftar Gratis
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* --- BAGIAN KANAN: ARTWORK (Hidden di HP) --- */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center">
                {/* Abstract Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-800 opacity-90"></div>
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content Quote */}
                <div className="relative z-10 max-w-lg text-center p-10">
                    <div className="mb-6 inline-flex p-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">"Kendalikan uangmu, atau uang yang akan mengendalikanmu."</h3>
                    <p className="text-indigo-200 text-lg">Mulai perjalanan kebebasan finansial Anda bersama Dompet Pintar hari ini.</p>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </div>
    );
}