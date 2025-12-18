import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // Jika link kurang dari 3 (cuma Prev & Next tapi ga ada halaman), sembunyikan
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
            {links.map((link, key) => (
                link.url === null ? (
                    // Tombol Disabled (Misal: Prev pas di halaman 1)
                    <div
                        key={key}
                        className="mb-1 mr-1 px-4 py-2 text-sm text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    // Tombol Aktif / Bisa Diklik
                    <Link
                        key={key}
                        href={link.url}
                        preserveScroll // Agar saat klik tidak scroll ke paling atas
                        preserveState // Agar filter tidak reset
                        className={`mb-1 mr-1 px-4 py-2 text-sm font-bold border rounded-xl transition-all duration-200 
                            ${link.active 
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 scale-105' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}