import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function Stats({ auth, chartData, categoryData, summaryTotal, filters }) {
    // --- STATE ---
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);
    const [viewType, setViewType] = useState('summary'); 
    const [isLoading, setIsLoading] = useState(false);
    const chartRef = useRef(null);
    const [chartGradient, setChartGradient] = useState({});

    useEffect(() => {
        const ctx = document.createElement('canvas').getContext('2d');
        const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
        gradientGreen.addColorStop(0, '#34D399');
        gradientGreen.addColorStop(1, '#059669');

        const gradientRed = ctx.createLinearGradient(0, 0, 0, 400);
        gradientRed.addColorStop(0, '#FB7185');
        gradientRed.addColorStop(1, '#E11D48');

        setChartGradient({ income: gradientGreen, expense: gradientRed });
    }, []);

    const fetchData = (params) => {
        router.get(route('stats'), params, {
            preserveScroll: true,
            preserveState: true,
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    };

    const handleFilter = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        fetchData({ start_date: start, end_date: end });
    };

    const applyPreset = (type) => {
        const today = new Date();
        let start = new Date();
        let end = new Date();

        if (type === 'week') {
            start.setDate(today.getDate() - 6);
        } else if (type === 'month') {
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        } else if (type === 'year') {
            start = new Date(today.getFullYear(), 0, 1);
            end = new Date(today.getFullYear(), 11, 31);
        }
        const formatDate = (d) => d.toISOString().split('T')[0];
        handleFilter(formatDate(start), formatDate(end));
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // --- CHART CONFIG ---
    const barDatasets = [];
    if (viewType === 'summary' || viewType === 'income') {
        barDatasets.push({
            label: 'Pemasukan',
            data: chartData.incomes,
            backgroundColor: chartGradient.income || '#10B981',
            borderRadius: 8,
            barPercentage: 0.6,
            categoryPercentage: 0.8,
            borderSkipped: false,
        });
    }
    if (viewType === 'summary' || viewType === 'expense') {
        barDatasets.push({
            label: 'Pengeluaran',
            data: chartData.expenses,
            backgroundColor: chartGradient.expense || '#F43F5E',
            borderRadius: 8,
            barPercentage: 0.6,
            categoryPercentage: 0.8,
            borderSkipped: false,
        });
    }

    const barChartConfig = {
        labels: chartData.labels,
        datasets: barDatasets,
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8, font: { weight: 'bold' }, color: '#94a3b8' } }, // Color update
            tooltip: { 
                backgroundColor: '#1e293b', 
                padding: 12, 
                cornerRadius: 12,
                titleFont: { size: 13 },
                bodyFont: { size: 13, weight: 'bold' },
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + formatRupiah(context.raw);
                    }
                }
            }
        },
        scales: {
            y: { 
                beginAtZero: true, 
                grid: { color: '#334155', borderDash: [5, 5] }, // Darker grid
                ticks: { 
                    color: '#94a3b8',
                    font: { size: 11 },
                    callback: (value) => value >= 1000 ? value / 1000 + 'k' : value 
                } 
            },
            x: { 
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { size: 11 } }
            }
        },
        interaction: { mode: 'index', intersect: false },
    };

    let doughnutConfig = { labels: [], datasets: [] };
    let chartTitle = "";
    let chartSubtitle = "";
    const paletteGreen = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
    const paletteRed = ['#E11D48', '#F43F5E', '#FB7185', '#FDA4AF', '#FECDD3'];
    const paletteMix = ['#34D399', '#F43F5E'];

    if (viewType === 'summary') {
        chartTitle = "Ringkasan Total";
        chartSubtitle = "Pemasukan vs Pengeluaran";
        doughnutConfig = {
            labels: ['Pemasukan', 'Pengeluaran'],
            datasets: [{
                data: [summaryTotal.income, summaryTotal.expense],
                backgroundColor: paletteMix,
                hoverOffset: 10,
                borderWidth: 0,
            }]
        };
    } else if (viewType === 'income') {
        chartTitle = "Kategori Pemasukan";
        chartSubtitle = "Detail sumber dananya";
        doughnutConfig = {
            labels: categoryData.income.labels,
            datasets: [{
                data: categoryData.income.data,
                backgroundColor: paletteGreen,
                hoverOffset: 10,
                borderWidth: 0,
            }]
        };
    } else if (viewType === 'expense') {
        chartTitle = "Kategori Pengeluaran";
        chartSubtitle = "Kemana saja uangmu pergi?";
        doughnutConfig = {
            labels: categoryData.expense.labels,
            datasets: [{
                data: categoryData.expense.data,
                backgroundColor: paletteRed,
                hoverOffset: 10,
                borderWidth: 0,
            }]
        };
    }

    const PresetButton = ({ label, onClick }) => (
        <button 
            onClick={onClick} 
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-xl transition-all duration-200 whitespace-nowrap"
        >
            {label}
        </button>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-slate-800 dark:text-white leading-tight">Analisis Statistik</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Visualisasi data keuanganmu dalam grafik.</p>
                    </div>
                    
                    <div className="relative z-20">
                        <select 
                            value={viewType}
                            onChange={(e) => setViewType(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer hover:border-indigo-300 transition-colors"
                        >
                            <option value="summary">📊 Ringkasan Total</option>
                            <option value="income">💰 Detail Pemasukan</option>
                            <option value="expense">💸 Detail Pengeluaran</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Statistik" />

            <div className="py-8 bg-slate-50 dark:bg-slate-900 min-h-screen relative transition-colors duration-300">

                {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-start justify-center pt-64 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-[2px] transition-all duration-300">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-slight">
                            <svg className="animate-spin h-6 w-6 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Mengambil data...</span>
                        </div>
                    </div>
                )}

                <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    
                    {/* FILTER BAR */}
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex bg-slate-50 dark:bg-slate-700/50 p-1 rounded-xl w-full md:w-auto overflow-x-auto scrollbar-hide">
                            <PresetButton label="Minggu Ini" onClick={() => applyPreset('week')} />
                            <PresetButton label="Bulan Ini" onClick={() => applyPreset('month')} />
                            <PresetButton label="Tahun Ini" onClick={() => applyPreset('year')} />
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto bg-slate-50 dark:bg-slate-700/50 p-1.5 rounded-xl px-3 border border-slate-100 dark:border-slate-700">
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-transparent border-none p-0 text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer w-full md:w-auto dark:color-scheme-dark"
                            />
                            <span className="text-slate-300 mx-1">➜</span>
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-transparent border-none p-0 text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer w-full md:w-auto dark:color-scheme-dark"
                            />
                            <button 
                                onClick={() => handleFilter(startDate, endDate)}
                                className="ml-3 bg-indigo-600 text-white p-1.5 rounded-lg hover:bg-indigo-700 transition shadow-sm"
                                title="Terapkan Filter"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* CHARTS GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Trend Keuangan</h3>
                                <p className="text-slate-400 dark:text-slate-500 text-sm">Visualisasi arus kas (Gradasi Warna)</p>
                            </div>
                            <div className="flex-1 min-h-[350px] relative">
                                <Bar options={barOptions} data={barChartConfig} />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
                            <div className="mb-6 border-b border-slate-50 dark:border-slate-700 pb-4">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{chartTitle}</h3>
                                <p className="text-slate-400 dark:text-slate-500 text-sm">{chartSubtitle}</p>
                            </div>

                            <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
                                {doughnutConfig.datasets[0].data.length > 0 && doughnutConfig.datasets[0].data.some(val => val > 0) ? (
                                    <Doughnut 
                                        data={doughnutConfig} 
                                        options={{ 
                                            responsive: true, 
                                            maintainAspectRatio: false,
                                            plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, color: '#94a3b8' } } },
                                            cutout: '70%',
                                            layout: { padding: 10 }
                                        }} 
                                    />
                                ) : (
                                    <div className="text-center text-slate-300 dark:text-slate-600 py-10">
                                        <div className="text-4xl mb-2">📉</div>
                                        <p className="text-sm">Tidak ada data.</p>
                                    </div>
                                )}
                            </div>

                            {viewType === 'summary' && (
                                <div className="mt-6 space-y-3">
                                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-slate-800 rounded-2xl border border-green-100 dark:border-green-900/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-200 dark:shadow-green-900"></div>
                                            <span className="text-xs font-extrabold text-green-700 dark:text-green-400 uppercase tracking-wider">Pemasukan</span>
                                        </div>
                                        <span className="text-base font-bold text-slate-700 dark:text-white">{formatRupiah(summaryTotal.income)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-white dark:from-red-900/20 dark:to-slate-800 rounded-2xl border border-red-100 dark:border-red-900/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-200 dark:shadow-red-900"></div>
                                            <span className="text-xs font-extrabold text-red-700 dark:text-red-400 uppercase tracking-wider">Pengeluaran</span>
                                        </div>
                                        <span className="text-base font-bold text-slate-700 dark:text-white">{formatRupiah(summaryTotal.expense)}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}