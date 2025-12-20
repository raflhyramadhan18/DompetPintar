import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from "axios";
import { exportPdf } from "@/Utils/exportPdf";
import { exportExcel } from "@/Utils/exportExcel";

export default function Export({ auth, categories }) {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [catMode, setCatMode] = useState('all'); 
    const [selectedCats, setSelectedCats] = useState([]);
    const [format, setFormat] = useState('pdf');
    const [isProcessing, setIsProcessing] = useState(false);

    const toggleCat = (id) => {
        if (selectedCats.includes(id)) {
            setSelectedCats(selectedCats.filter(c => c !== id));
        } else {
            setSelectedCats([...selectedCats, id]);
        }
    };


const handleExport = async () => {
    setIsProcessing(true);

    try {
        const params = {
            start_date: startDate,
            end_date: endDate,
            category_mode: catMode,
            categories: selectedCats,
        };

        // ⬇️ backend HANYA kirim data JSON
        const { data } = await axios.get(route("export.data"), { params });

        if (format === "pdf") {
            exportPdf(data.transactions, data.meta);
        } else {
            exportExcel(data.transactions, data.meta);
        }

    } catch (e) {
        alert("Gagal export data");
        console.error(e);
    } finally {
        setIsProcessing(false);
    }
};


    const FormatCard = ({ type, active, onClick }) => {
        const isPdf = type === 'pdf';
        const colorClass = isPdf 
            ? (active ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 ring-2 ring-red-200 dark:ring-red-900' : 'hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50/50 dark:hover:bg-red-900/10') 
            : (active ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-200 dark:ring-emerald-900' : 'hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10');

        return (
            <button 
                onClick={onClick}
                className={`relative group p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 w-full text-left ${active ? 'border-transparent' : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800'} ${colorClass}`}
            >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 ${isPdf ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                    {isPdf ? '📄' : '📊'}
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{isPdf ? 'Dokumen PDF' : 'Excel Spreadsheet'}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{isPdf ? 'Siap cetak & baca' : 'Bisa diolah kembali'}</p>
                </div>
                {active && (
                    <div className="absolute top-4 right-4 text-lg">
                        ✅
                    </div>
                )}
            </button>
        );
    };

    const CategoryTab = ({ label, value, active }) => (
        <button
            onClick={() => setCatMode(value)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                active 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 transform scale-105' 
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
        >
            {label}
        </button>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 dark:text-white leading-tight">Pusat Laporan</h2>}
        >
            <Head title="Ekspor Laporan" />

            <div className="py-8 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                        <div className="p-8 md:p-10 relative z-10">
                            
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
                                    🖨️
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Ekspor Data Keuangan</h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
                                    Unduh riwayat transaksimu untuk arsip pribadi atau kebutuhan pelaporan. Pilih filter di bawah ini.
                                </p>
                            </div>

                            <div className="space-y-8">
                                
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">1. Periode Waktu</label>
                                    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-600">
                                        <div className="relative w-full">
                                            <span className="absolute left-4 top-3.5 text-slate-400">📅</span>
                                            <input 
                                                type="date" 
                                                value={startDate}
                                                onChange={e => setStartDate(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-transparent rounded-xl focus:border-indigo-500 focus:ring-0 text-slate-700 dark:text-white font-bold shadow-sm transition-all dark:color-scheme-dark"
                                            />
                                        </div>
                                        <span className="text-slate-400 font-bold">➜</span>
                                        <div className="relative w-full">
                                            <span className="absolute left-4 top-3.5 text-slate-400">📅</span>
                                            <input 
                                                type="date" 
                                                value={endDate}
                                                onChange={e => setEndDate(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-transparent rounded-xl focus:border-indigo-500 focus:ring-0 text-slate-700 dark:text-white font-bold shadow-sm transition-all dark:color-scheme-dark"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">2. Filter Kategori</label>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <CategoryTab label="Semua Data" value="all" active={catMode === 'all'} />
                                        <CategoryTab label="Hanya Pemasukan" value="income" active={catMode === 'income'} />
                                        <CategoryTab label="Hanya Pengeluaran" value="expense" active={catMode === 'expense'} />
                                        <CategoryTab label="Pilih Manual" value="custom" active={catMode === 'custom'} />
                                    </div>

                                    {catMode === 'custom' && (
                                        <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-600 animate-fade-in-down">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-3">Pilih kategori yang diinginkan:</p>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {categories.map(cat => (
                                                    <label 
                                                        key={cat.id} 
                                                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200 ${
                                                            selectedCats.includes(cat.id) 
                                                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                                                            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-slate-300'
                                                        }`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                                            selectedCats.includes(cat.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700'
                                                        }`}>
                                                            {selectedCats.includes(cat.id) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                        <input 
                                                            type="checkbox" 
                                                            className="hidden"
                                                            checked={selectedCats.includes(cat.id)}
                                                            onChange={() => toggleCat(cat.id)}
                                                        />
                                                        <span className="text-sm font-semibold">{cat.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">3. Format File</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormatCard 
                                            type="pdf" 
                                            active={format === 'pdf'} 
                                            onClick={() => setFormat('pdf')} 
                                        />
                                        <FormatCard 
                                            type="xlsx" 
                                            active={format === 'xlsx'} 
                                            onClick={() => setFormat('xlsx')} 
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex gap-4">
                                    <button 
                                        onClick={() => window.history.back()}
                                        className="px-8 py-4 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        Kembali
                                    </button>
                                    <button 
                                        onClick={handleExport}
                                        disabled={isProcessing}
                                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Sedang Memproses...
                                            </>
                                        ) : (
                                            <>🚀 Ekspor Laporan Sekarang</>
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}