<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Panggil Seeder Kategori yang tadi kita buat
        $this->call(CategorySeeder::class);

        // 2. Bikin 1 User Admin (Biar gampang login)
        User::factory()->create([
            'name' => 'Admin Dompet',
            'email' => 'admin@dompet.com',
            'password' => bcrypt('password'), // Passwordnya 'password'
        ]);
    }
}