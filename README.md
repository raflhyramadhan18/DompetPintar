DompetPintar - Sistem Manajemen Keuangan Pribadi
DompetPintar adalah aplikasi berbasis web yang dirancang untuk membantu pengguna mengelola keuangan pribadi dengan lebih cerdas. Aplikasi ini memungkinkan pencatatan pemasukan, pengeluaran, serta pembuatan laporan keuangan dalam format PDF secara otomatis.

1. Fitur Utama
Dashboard Interaktif: Ringkasan saldo, pemasukan, dan pengeluaran dalam satu tampilan.

Manajemen Transaksi: Tambah, edit, dan hapus data pemasukan serta pengeluaran dengan mudah.

Kategori Kustom: Kelola kategori transaksi untuk pelacakan yang lebih detail.

Laporan PDF: Cetak laporan keuangan periode tertentu menggunakan library DomPDF.

Antarmuka Modern: UI responsif dan cepat berkat perpaduan Inertia.js dan Tailwind CSS.

Sistem Autentikasi: Keamanan data pengguna terjamin dengan sistem login dan registrasi.

2. Teknologi yang Digunakan
Backend & Framework
Laravel: Framework PHP utama untuk logika bisnis dan API.

Inertia.js: Menghubungkan Laravel dengan frontend modern tanpa membangun API REST yang rumit (Classic SPA).

Frontend
React.js: Framework JavaScript untuk UI yang reaktif.

Tailwind CSS: Untuk styling yang modern dan responsif.

Library Utama (Dependencies)
DomPDF: Digunakan untuk generate dokumen PDF dari tampilan HTML/CSS.

Ziggy: Memudahkan penggunaan route Laravel di dalam file JavaScript/Vue.

Lucide Icons: Library icon untuk mempercantik UI.

3. Panduan Instalasi
Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di komputer lokal Anda:

1. Clone Repositori
Bash

git clone https://github.com/raflhyramadhan18/DompetPintar.git
cd DompetPintar
2. Instalasi Dependency (PHP)
Pastikan Anda sudah menginstal Composer.

Bash

composer install
3. Instalasi Dependency (JavaScript)
Pastikan Anda sudah menginstal Node.js dan NPM.

Bash

npm install
4. Konfigurasi Environment
Salin file .env.example menjadi .env dan sesuaikan pengaturan database Anda.

Bash

cp .env.example .env
Lalu buat application key:

Bash

php artisan key:generate
5. Migrasi & Seeder Database
Buat database baru di MySQL (misal: db_dompet_pintar), lalu jalankan:

Bash

php artisan migrate --seed
6. Menjalankan Server
Jalankan server Laravel dan proses compile frontend di dua terminal berbeda:

Terminal 1 (Laravel Server):

Bash

php artisan serve
Terminal 2 (Vite HMR):

Bash

npm run dev
Aplikasi sekarang dapat diakses di http://127.0.0.1:8000.

 Dokumentasi Library Penting
 DomPDF (Generate Laporan)
Untuk mengubah data transaksi menjadi laporan PDF, fungsi ini biasanya diletakkan di Controller. Contoh penggunaan:

PHP

use Barryvdh\DomPDF\Facade\Pdf;

public function exportPdf() {
    $data = Transaction::all();
    $pdf = Pdf::loadView('pdf.report', compact('data'));
    return $pdf->download('laporan-keuangan.pdf');
}
🔄 Inertia.js (Data Flow)
Data dari Controller dikirim langsung ke component Vue/React tanpa perlu fetch manual:

PHP

return Inertia::render('Dashboard', [
    'transactions' => Transaction::latest()->get()
]);

Kontribusi
Kontribusi selalu terbuka! Jika Anda ingin meningkatkan proyek ini:

Fork repositori ini.

Buat branch fitur baru (git checkout -b fitur/HebatBaru).

Commit perubahan Anda (git commit -m 'Menambah fitur hebat').

Push ke branch (git push origin fitur/HebatBaru).

Buat Pull Request.

