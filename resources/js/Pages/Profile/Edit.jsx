import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    
    // Helper untuk inisial nama
    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-slate-800 leading-tight">Pengaturan Akun</h2>}
        >
            <Head title="Profile" />

            <div className="py-12 bg-slate-50 min-h-screen relative">
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 relative z-10">
                    
                    {/* 1. HEADER CARD (Identitas) */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        
                        {/* Avatar Besar */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-indigo-50">
                            {getInitials(auth.user.name)}
                        </div>
                        
                        <div className="text-center md:text-left flex-1">
                            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">{auth.user.name}</h3>
                            <p className="text-slate-500 font-medium">{auth.user.email}</p>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                                    ✅ Akun Aktif
                                </span>
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                                    📅 Member sejak 2025
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. GRID LAYOUT (Profil & Password) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Kolom Kiri: Update Info */}
                        <div className="p-8 bg-white shadow-lg shadow-slate-200/50 rounded-[2.5rem] border border-slate-100 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800">Informasi Pribadi</h4>
                                    <p className="text-xs text-slate-400">Update nama dan email kamu.</p>
                                </div>
                            </div>
                            
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        {/* Kolom Kanan: Update Password */}
                        <div className="p-8 bg-white shadow-lg shadow-slate-200/50 rounded-[2.5rem] border border-slate-100 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800">Keamanan</h4>
                                    <p className="text-xs text-slate-400">Pastikan passwordmu kuat.</p>
                                </div>
                            </div>

                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* 3. DANGER ZONE (Delete Account) */}
                    <div className="mt-8 p-8 bg-white shadow-lg shadow-red-100/50 rounded-[2.5rem] border border-red-100 relative overflow-hidden group">
                        {/* Strip Merah Kiri */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-red-600">Zona Bahaya</h4>
                                    <p className="text-xs text-red-400">Tindakan ini tidak dapat dibatalkan.</p>
                                </div>
                            </div>

                            <div className="max-w-xl">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}