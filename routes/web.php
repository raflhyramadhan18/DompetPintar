<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TransactionController; // Pastikan Controller ini di-import

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

// Route Dashboard (Tetap berdiri sendiri sesuai kode lama)
Route::get('/dashboard', [TransactionController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Group Middleware Auth (Untuk Profile & Transaksi)
Route::middleware('auth')->group(function () {
    // --- Route Profile (Bawaan Breeze) ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Route Form Tambah Transaksi (BARU - Disisipkan disini) ---
    Route::get('/transactions/create', [TransactionController::class, 'create'])->name('transactions.create');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');


    // --- TAMBAHAN BARU (Edit, Update, Delete) ---
    Route::get('/transactions/{id}/edit', [TransactionController::class, 'edit'])->name('transactions.edit');
    Route::put('/transactions/{id}', [TransactionController::class, 'update'])->name('transactions.update');
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy'])->name('transactions.destroy');

    Route::get('/stats', [TransactionController::class, 'stats'])->name('stats');


    Route::get('/export', [TransactionController::class, 'exportForm'])->name('export');
    Route::get('/export/process', [TransactionController::class, 'exportProcess'])->name('export.process');
});

require __DIR__.'/auth.php';