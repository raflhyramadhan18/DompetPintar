# 📂 DompetPintar - Sistem Manajemen Keuangan Pribadi

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

**DompetPintar** adalah aplikasi manajemen keuangan berbasis web yang dirancang untuk membantu pengguna mengelola arus kas pribadi secara cerdas. Catat pemasukan, pantau pengeluaran, dan hasilkan laporan profesional dalam sekejap.

---

## ✨ Fitur Utama

* **📊 Dashboard Interaktif**: Visualisasi ringkasan saldo, total pemasukan, dan pengeluaran secara real-time.
* **💸 Manajemen Transaksi**: Sistem CRUD lengkap untuk mencatat setiap aktivitas keuangan.
* **📂 Kategori Kustom**: Kategorikan transaksi Anda (makanan, transportasi, hobi, dll) untuk analisis yang lebih baik.
* **📄 Laporan PDF**: Ekspor laporan keuangan periode tertentu ke format PDF menggunakan **DomPDF**.
* **⚡ UI Modern & Responsif**: Pengalaman pengguna yang mulus (Single Page Application) dengan **Inertia.js** dan desain estetik dari **Tailwind CSS**.
* **🔐 Autentikasi Aman**: Perlindungan data pribadi dengan sistem Login dan Registrasi yang terenkripsi.

---

## 🛠️ Teknologi & Library

### Stack Utama
| Teknologi | Kegunaan |
| :--- | :--- |
| **Laravel** | Backend Framework & RESTful Service |
| **React.js** | Library Frontend untuk Antarmuka Reaktif |
| **Inertia.js** | Jembatan (Bridge) antara Laravel & React |
| **MySQL** | Database Relasional untuk Penyimpanan Data |

### Library Tambahan
* **DomPDF**: Library untuk konversi HTML ke PDF secara otomatis.
* **Ziggy**: Integrasi rute Laravel di sisi client (JavaScript).
* **Lucide Icons**: Koleksi ikon minimalis untuk mempercantik UI.
* **Tailwind Merge**: Optimasi class CSS pada komponen React.

---

## 🚀 Panduan Instalasi

Pastikan Anda sudah menginstal **PHP >= 8.1**, **Composer**, dan **Node.js** di perangkat Anda.

### 1. Persiapan Repositori
```bash
git clone [https://github.com/raflhyramadhan18/DompetPintar.git](https://github.com/raflhyramadhan18/DompetPintar.git)
cd DompetPintar

2. Instalasi Dependency
Instal library PHP (Laravel) dan paket JavaScript (React):

Bash

composer install
npm install
3. Konfigurasi Lingkungan
Salin file .env dan atur koneksi database Anda:

Bash

cp .env.example .env
php artisan key:generate
4. Database & Migrasi
Buat database baru di MySQL, sesuaikan konfigurasinya di .env, lalu jalankan:

Bash

php artisan migrate --seed
5. Menjalankan Aplikasi
Buka dua terminal dan jalankan perintah berikut secara bersamaan:

Terminal 1 (Backend):

Bash

php artisan serve
Terminal 2 (Frontend):

Bash

npm run dev
Akses aplikasi melalui browser di: http://localhost:8000

📖 Dokumentasi Teknis
📂 Struktur Web Service (Backend)
Logika utama aplikasi ini berada di dalam folder berikut:

app/Http/Controllers/: Menangani permintaan (request) dan logika bisnis utama.

routes/web.php: Definisi endpoint dan penghubung ke komponen React via Inertia.

app/Models/: Definisi struktur data, tabel, dan relasi database.

📄 Implementasi DomPDF
Proses cetak laporan dilakukan di Controller dengan memanggil library PDF:

PHP

use Barryvdh\DomPDF\Facade\Pdf;

public function downloadReport() 
{
    $data = Transaction::where('user_id', auth()->id())->get();
    $pdf = Pdf::loadView('pdf.laporan', compact('data'));
    
    return $pdf->download('DompetPintar-Laporan.pdf');
}
🔄 Aliran Data (Inertia.js)
Data dikirim langsung dari Controller ke UI React tanpa perlu membuat API Fetching manual:

PHP

return Inertia::render('Transactions/Index', [
    'items' => Transaction::latest()->get(),
]);
🤝 Kontribusi
Ingin membantu mengembangkan DompetPintar?

Fork proyek ini.

Buat branch fitur baru (git checkout -b fitur/FiturKeren).

Commit perubahan Anda (git commit -m 'Menambah fitur keren').

Push ke branch (git push origin fitur/FiturKeren).

Buka Pull Request.

📜 Lisensi
Proyek ini dilindungi di bawah lisensi MIT. Lihat file LICENSE untuk informasi lebih lanjut.

👤 Author
Rafli Ramadhan

GitHub: @raflhyramadhan18
