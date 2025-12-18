<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            // Ini Relasi ke Tabel User (Wajib, biar tau punya siapa)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Ini Relasi ke Tabel Kategori
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            
            $table->decimal('amount', 15, 2); // Nominal uang (bisa koma)
            $table->string('description'); // Keterangan, misal: "Nasi Padang"
            $table->date('transaction_date'); // Tanggal transaksi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
