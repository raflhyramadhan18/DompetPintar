<?php

namespace App\Exports;

use App\Models\Transaction;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TransactionsExport implements FromView, ShouldAutoSize, WithStyles
{
    protected $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    public function view(): View
    {
        $query = Transaction::query()->with('category');

        // 1. Filter Tanggal
        if (!empty($this->filters['start_date']) && !empty($this->filters['end_date'])) {
            $query->whereBetween('transaction_date', [
                $this->filters['start_date'], 
                $this->filters['end_date']
            ]);
        }

        // 2. Filter Kategori
        $catFilter = $this->filters['category_mode'] ?? 'all';
        $selectedCats = $this->filters['categories'] ?? [];

        if ($catFilter === 'income') {
            $query->whereHas('category', function($q) { $q->where('type', 'income'); });
        } elseif ($catFilter === 'expense') {
            $query->whereHas('category', function($q) { $q->where('type', 'expense'); });
        } elseif ($catFilter === 'custom' && !empty($selectedCats)) {
            // Kalau pilih "Sesuaikan", ambil berdasarkan ID kategori yang dipilih
            $query->whereIn('category_id', $selectedCats);
        }

        $transactions = $query->orderBy('transaction_date')->get();

        return view('exports.transactions', [
            'transactions' => $transactions,
            'filters' => $this->filters
        ]);
    }

    // Styling biar tabelnya rapi
    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]], // Baris 1 (Header) Bold
        ];
    }
}