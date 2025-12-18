<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Data Pengeluaran (Expense)
        $expenses = ['Makan', 'Transport', 'Sewa Kos', 'Pulsa/Data', 'Hiburan', 'Belanja'];
        
        foreach ($expenses as $item) {
            Category::create([
                'name' => $item,
                'type' => 'expense'
            ]);
        }

        // Data Pemasukan (Income)
        $incomes = ['Gaji', 'Uang Saku', 'Bonus', 'Hadiah'];
        
        foreach ($incomes as $item) {
            Category::create([
                'name' => $item,
                'type' => 'income'
            ]);
        }
    }
}