<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; // <-- Tambahan untuk debug
use App\Http\Controllers\ExportController
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route Dashboard
Route::get('/dashboard', [TransactionController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Group Middleware Auth
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/transactions/create', [TransactionController::class, 'create'])->name('transactions.create');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/transactions/{id}/edit', [TransactionController::class, 'edit'])->name('transactions.edit');
    Route::put('/transactions/{id}', [TransactionController::class, 'update'])->name('transactions.update');
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy'])->name('transactions.destroy');

    Route::get('/stats', [TransactionController::class, 'stats'])->name('stats');
    Route::get('/export', [TransactionController::class, 'exportForm'])->name('export');
    Route::get('/export/process', [TransactionController::class, 'exportProcess'])->name('export.process');
    Route::get('/export/data', [ExportController::class, 'data'])
        ->name('export.data');
});




require __DIR__.'/auth.php';

// ==========================================
// AREA DEBUGGING (AKSES INI UNTUK CEK ERROR)
// ==========================================
Route::get('/debug-db', function () {
    try {
        // 1. Cek Koneksi Database
        $pdo = DB::connection()->getPdo();
        $dbName = DB::connection()->getDatabaseName();
        
        // 2. Cek Apakah Tabel Users Ada
        $userCount = 0;
        try {
            $userCount = DB::table('users')->count();
        } catch (\Exception $e) {
            return "⚠️ Koneksi OK, tapi tabel 'users' tidak ditemukan. <br>Error: " . $e->getMessage();
        }

        return "
            <div style='font-family:sans-serif; padding:20px; line-height:1.6'>
                <h1 style='color:green'>✅ KONEKSI DATABASE SUKSES!</h1>
                <ul>
                    <li><strong>Database:</strong> $dbName</li>
                    <li><strong>Jumlah User:</strong> $userCount</li>
                    <li><strong>App URL:</strong> " . config('app.url') . "</li>
                    <li><strong>App Environment:</strong> " . config('app.env') . "</li>
                </ul>
                <p>Jika halaman ini muncul, berarti database AMAN. Masalah ada di Session/Cookie browser kamu.</p>
            </div>
        ";
    } catch (\Exception $e) {
        return "
            <div style='font-family:sans-serif; padding:20px; line-height:1.6'>
                <h1 style='color:red'>❌ KONEKSI GAGAL (ERROR 500)</h1>
                <p>Ini adalah pesan error aslinya (kirimkan ini ke AI):</p>
                <code style='background:#f4f4f4; padding:10px; display:block; border:1px solid #ccc'>" . $e->getMessage() . "</code>
            </div>
        ";
    }
});