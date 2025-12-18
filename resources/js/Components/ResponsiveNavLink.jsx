import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium transition duration-150 ease-in-out ' +
                (active
                    ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 ' +
                      'dark:border-indigo-600 dark:text-indigo-300 dark:bg-indigo-900/50' // <--- Style Dark Mode Aktif
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 ' +
                      'dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-slate-800 dark:hover:border-slate-600') // <--- Style Dark Mode Tidak Aktif
                + className
            }
        >
            {children}
        </Link>
    );
}