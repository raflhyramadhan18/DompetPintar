import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Edit({ auth, transaction, categories }) {
    
    // --- STATE FORM ---
    const { data, setData, put, processing, errors } = useForm({
        transaction_date: transaction.transaction_date.split('T')[0], // Format YYYY-MM-DD
        category_id: transaction.category_id,
        amount: transaction.amount,
        description: transaction.description,
    });

    // --- LOGIC UI DINAMIS ---
    // Cari kategori yang sedang dipilih untuk menentukan warna tema (Merah/Hijau)
    const selectedCategory = categories.find(c => c.id == data.category_id);
    const isExpense = selectedCategory?.type === 'expense';
    
    // Tentukan Warna Tema berdasarkan Tipe Kategori
    const themeColor = isExpense ? 'rose' : 'emerald'; // rose (merah) atau emerald (hijau)
    const accentColor = isExpense ? 'text-rose-600' : 'text-emerald-600';
    const ringColor = isExpense ? 'focus:ring-rose-500' : 'focus:ring-emerald-500';
    const borderColor = isExpense ? 'focus:border-rose-500' : 'focus:border-emerald-500';
    const bgSoft = isExpense ? 'bg-rose-50' : 'bg-emerald-50';

    const submit = (e) => {
        e.preventDefault();
        put(route('transactions.update', transaction.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">Edit Transaksi</h2>}
        >
            <Head title="Edit Transaksi" />

            <div className="py-12 bg-slate-50 min-h-screen relative overflow-hidden">
                
                {/* Background Decoration (Blob Halus) */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20 pointer-events-none ${isExpense ? 'bg-rose-300' : 'bg-emerald-300'} transition-colors duration-500`}></div>

                <div className="max-w-xl mx-auto sm:px-6 lg:px-8 relative z-10">
                    
                    <form onSubmit={submit} className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                        
                        {/* HEADER KARTU */}
                        <div className={`px-8 py-6 border-b border-slate-50 flex items-center justify-between ${bgSoft} transition-colors duration-500`}>
                            <div>
                                <h3 className={`text-lg font-bold ${accentColor} transition-colors duration-500`}>
                                    {isExpense ? '💸 Edit Pengeluaran' : '💰 Edit Pemasukan'}
                                </h3>
                                <p className="text-slate-500 text-sm">Perbarui detail transaksi ini.</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white shadow-sm ${accentColor}`}>
                                {isExpense ? '⬇️' : '⬆️'}
                            </div>
                        </div>

                        <div className="p-8 space-y-6">

                            {/* 1. INPUT NOMINAL (BIG & BOLD) */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nominal (Rp)</label>
                                <div className="relative">
                                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold ${accentColor}`}>Rp</span>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className={`w-full pl-12 pr-4 py-4 text-3xl font-extrabold text-slate-800 bg-slate-50 border-none rounded-2xl focus:ring-2 ${ringColor} transition-all placeholder:text-slate-300`}
                                        placeholder="0"
                                    />
                                </div>
                                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                            </div>

                            {/* 2. INPUT KATEGORI & TANGGAL (GRID) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Kategori */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                                    <div className="relative">
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className={`w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 ${ringColor} ${borderColor} transition-all appearance-none cursor-pointer`}
                                        >
                                            <option value="" disabled>Pilih Kategori</option>
                                            <optgroup label="🟢 Pemasukan">
                                                {categories.filter(c => c.type === 'income').map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </optgroup>
                                            <optgroup label="🔴 Pengeluaran">
                                                {categories.filter(c => c.type === 'expense').map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </optgroup>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                    {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                                </div>

                                {/* Tanggal */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label>
                                    <input
                                        type="date"
                                        value={data.transaction_date}
                                        onChange={(e) => setData('transaction_date', e.target.value)}
                                        className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 ${ringColor} ${borderColor} transition-all`}
                                    />
                                    {errors.transaction_date && <p className="text-red-500 text-sm mt-1">{errors.transaction_date}</p>}
                                </div>
                            </div>

                            {/* 3. INPUT KETERANGAN */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Keterangan / Catatan</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 ${ringColor} ${borderColor} transition-all resize-none`}
                                    placeholder="Contoh: Makan siang nasi padang..."
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                        </div>

                        {/* FOOTER ACTIONS */}
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-3 text-slate-600 font-bold hover:text-slate-800 transition-colors"
                            >
                                Batal
                            </Link>
                            
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-8 py-3 rounded-xl text-white font-bold shadow-lg transform transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:translate-y-0 disabled:cursor-not-allowed flex items-center gap-2
                                    ${isExpense 
                                        ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-red-200' 
                                        : 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-200'
                                    }`}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>Simpan Perubahan ✨</>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}