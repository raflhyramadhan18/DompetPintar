import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function Dashboard({ auth, transactions, categories, filters, summary }) {
    
    // --- STATE MANAGEMENT ---
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || 'all');
    const [category, setCategory] = useState(filters.category_id || 'all');
    const [sort, setSort] = useState(filters.sort || 'newest');
    const [isLoading, setIsLoading] = useState(false);
    
    // State Modal & Toast
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (flash?.message) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    // --- HELPER FUNCTIONS ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const formatDateComplete = (dateString) => {
        const date = new Date(dateString);
        return {
            dayName: date.toLocaleDateString('id-ID', { weekday: 'long' }),
            fullDate: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        };
    };

    // --- UPDATE 1: TAMBAH PARAMETER 'silent' ---
    // silent = true berarti jangan munculkan loading overlay
    const fetchData = (newParams, silent = false) => {
        router.get(route('dashboard'), newParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onStart: () => {
                // Cek: Kalau TIDAK silent, baru nyalakan loading
                if (!silent) setIsLoading(true);
            },
            onFinish: () => setIsLoading(false),
        });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = {
            period: filters.period,
            search: key === 'search' ? value : search,
            type: key === 'type' ? value : type,
            category_id: key === 'category' ? value : category,
            sort: key === 'sort' ? value : sort,
        };

        // --- UPDATE 2: CEK APAKAH INI SEARCH? ---
        // Jika yang diubah adalah 'search', maka silent mode AKTIF (true)
        const isSearch = key === 'search';
        fetchData(newFilters, isSearch);
    };

    // --- HANDLERS ---
    const confirmDelete = (id) => setDeleteModal({ isOpen: true, id: id });
    const cancelDelete = () => setDeleteModal({ isOpen: false, id: null });
    
    const handleDelete = () => {
        if (deleteModal.id) {
            router.delete(route('transactions.destroy', deleteModal.id), {
                preserveScroll: true,
                onStart: () => { 
                    setDeleteModal({ isOpen: false, id: null }); 
                    setIsLoading(true); 
                },
                onFinish: () => setIsLoading(false),
            });
        }
    };

    // --- COMPONENT: TAB BUTTON ---
    const TabButton = ({ label, value, active }) => (
        // Tab tetap pakai loading (silent = false / default)
        <button 
            onClick={() => fetchData({ ...filters, period: value })} 
            className={`relative flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${
                active 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 scale-105 z-10' 
                : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700'
            }`}
        >
            {label}
        </button>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 dark:text-white leading-tight">Overview Keuangan</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8 bg-slate-50 dark:bg-slate-900 min-h-screen relative transition-colors duration-300">
                
                {/* --- TOAST NOTIFICATION --- */}
                <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-500 ease-in-out ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md bg-opacity-90 border border-emerald-400">
                        <div className="bg-white/20 p-1 rounded-full">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="font-bold text-sm tracking-wide">{flash?.message}</span>
                    </div>
                </div>

                {/* --- LOADING OVERLAY --- */}
                {isLoading && (
                    <div className="absolute inset-0 z-40 flex items-start justify-center pt-64 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-[2px] transition-all duration-300">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-slight">
                            <svg className="animate-spin h-6 w-6 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Memuat data...</span>
                        </div>
                    </div>
                )}

                {/* --- DELETE MODAL --- */}
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" onClick={cancelDelete}></div>
                        <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100 animate-blob border dark:border-slate-700">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-red-50/50 dark:ring-red-900/20">
                                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Hapus Transaksi?</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-6 leading-relaxed">
                                    Data transaksi ini akan dihapus secara permanen.
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button onClick={cancelDelete} className="flex-1 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">Batal</button>
                                    <button onClick={handleDelete} className="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-red-900/50 transition-all hover:-translate-y-0.5">Ya, Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MAIN CONTENT --- */}
                <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    
                    {/* Period Tabs */}
                    <div className="flex justify-center">
                        <div className="inline-flex bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 gap-2 w-full max-w-lg transition-colors">
                            <TabButton label="Hari Ini" value="day" active={filters.period === 'day'} />
                            <TabButton label="Minggu Ini" value="week" active={filters.period === 'week'} />
                            <TabButton label="Bulan Ini" value="month" active={filters.period === 'month'} />
                            <TabButton label="Tahun Ini" value="year" active={filters.period === 'year'} />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Saldo */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/50 relative overflow-hidden group border border-indigo-500/20">
                            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-purple-500 opacity-20 rounded-full blur-xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 opacity-80">
                                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></div>
                                    <span className="text-sm font-medium tracking-wide">Sisa Saldo</span>
                                </div>
                                <h3 className="text-4xl font-extrabold tracking-tight">{formatRupiah(summary.balance)}</h3>
                                <p className="mt-4 text-xs font-medium text-indigo-100 bg-indigo-800/30 inline-block px-3 py-1 rounded-full border border-indigo-400/30">Update Real-time</p>
                            </div>
                        </div>

                        {/* Pemasukan */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between group hover:border-green-200 dark:hover:border-green-800 transition-colors duration-300">
                            <div className="flex justify-between items-start">
                                <div><p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">Pemasukan</p><h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{formatRupiah(summary.income)}</h3></div>
                                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform shadow-sm">↓</div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden"><div className="bg-green-500 h-full rounded-full w-3/4 opacity-80"></div></div>
                        </div>

                        {/* Pengeluaran */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between group hover:border-red-200 dark:hover:border-red-800 transition-colors duration-300">
                            <div className="flex justify-between items-start">
                                <div><p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">Pengeluaran</p><h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{formatRupiah(summary.expense)}</h3></div>
                                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform shadow-sm">↑</div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden"><div className="bg-red-500 h-full rounded-full w-1/2 opacity-80"></div></div>
                        </div>
                    </div>

                    {/* TABLE & TOOLBAR */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                        
                        {/* Toolbar */}
                        <div className="p-6 border-b border-slate-50 dark:border-slate-700 space-y-5">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div><h3 className="text-lg font-bold text-slate-800 dark:text-white">Riwayat Transaksi</h3><p className="text-slate-400 dark:text-slate-500 text-sm">Kelola data pemasukan dan pengeluaranmu.</p></div>
                                <Link href={route('transactions.create')} className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-lg hover:shadow-slate-300 dark:hover:shadow-indigo-900/50 hover:-translate-y-0.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Tambah Baru</Link>
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="md:col-span-5 relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                                    <input type="text" placeholder="Cari transaksi..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border-transparent bg-white dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 text-sm font-medium shadow-sm transition-all placeholder:text-slate-400" value={search} onChange={(e) => { setSearch(e.target.value); handleFilterChange('search', e.target.value); }} />
                                </div>
                                <div className="md:col-span-2"><select className="w-full py-2.5 rounded-xl border-transparent bg-white dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 text-sm font-medium text-slate-600 shadow-sm cursor-pointer hover:bg-white/80" value={sort} onChange={(e) => { setSort(e.target.value); handleFilterChange('sort', e.target.value); }}><option value="newest">📅 Terbaru</option><option value="oldest">📅 Terlama</option><option value="a_z">🔤 A-Z</option><option value="z_a">🔤 Z-A</option></select></div>
                                <div className="md:col-span-2"><select className="w-full py-2.5 rounded-xl border-transparent bg-white dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 text-sm font-medium text-slate-600 shadow-sm cursor-pointer hover:bg-white/80" value={type} onChange={(e) => { setType(e.target.value); handleFilterChange('type', e.target.value); }}><option value="all">Semua Tipe</option><option value="income">Pemasukan</option><option value="expense">Pengeluaran</option></select></div>
                                <div className="md:col-span-3"><select className="w-full py-2.5 rounded-xl border-transparent bg-white dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 text-sm font-medium text-slate-600 shadow-sm cursor-pointer hover:bg-white/80" value={category} onChange={(e) => { setCategory(e.target.value); handleFilterChange('category', e.target.value); }}><option value="all">Semua Kategori</option>{categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}</select></div>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="min-w-full table-auto">
                                <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Keterangan</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nominal</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-50 dark:divide-slate-700/50">
                                    {!transactions?.data?.length ? (
                                        <tr><td colSpan="5" className="px-6 py-16 text-center"><div className="flex flex-col items-center justify-center animate-pulse"><div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-4xl mb-4 text-slate-300 dark:text-slate-500">🔍</div><p className="text-slate-800 dark:text-white font-bold text-lg">Data Tidak Ditemukan</p><p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Coba ubah filter atau periode waktunya.</p></div></td></tr>
                                    ) : (
                                        transactions.data.map((trx) => {
                                            const dateInfo = formatDateComplete(trx.transaction_date);
                                            return (
                                                <tr key={trx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition duration-200 group">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-extrabold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-0.5">{dateInfo.dayName}</span>
                                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{dateInfo.fullDate}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${trx.category.type === 'expense' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30' : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30'}`}>{trx.category.name}</span></td>
                                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium max-w-xs truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{trx.description}</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right tracking-tight ${trx.category.type === 'expense' ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>{trx.category.type === 'expense' ? '-' : '+'} {formatRupiah(trx.amount)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                                                            <Link href={route('transactions.edit', trx.id)} className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition border border-blue-100 dark:border-blue-900/30" title="Edit"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></Link>
                                                            <button onClick={() => confirmDelete(trx.id)} className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition border border-red-100 dark:border-red-900/30" title="Hapus"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* --- PAGINATION (DITARUH DISINI) --- */}
                        <div className="p-4 border-t border-slate-50 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                            <Pagination links={transactions.links} />
                        </div>
                        {/* ----------------------------------- */}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}