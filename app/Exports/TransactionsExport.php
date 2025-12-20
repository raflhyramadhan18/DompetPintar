<?php

namespace App\Exports;

use App\Models\Transaction;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class TransactionsExport implements FromView, ShouldAutoSize, WithStyles
{
    protected $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    public function view(): View
    {
        // Filter berdasarkan User yang login agar data tidak tertukar
        $query = Transaction::where('user_id', Auth::id())->with('category');

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
            $query->whereIn('category_id', $selectedCats);
        }

        $transactions = $query->orderBy('transaction_date', 'asc')->get();

        // Mengarah ke resources/views/exports/transactions.blade.php
        return view('exports.transactions', [
            'transactions' => $transactions,
            'filters' => $this->filters
        ]);
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Baris 4 adalah header tabel kita setelah judul laporan
            4 => ['font' => ['bold' => true]], 
        ];
    }
    public function data(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date'   => 'required|date',
        ]);

        $transactions = Transaction::with('category')
            ->whereBetween('transaction_date', [
                $request->start_date,
                $request->end_date
            ])
            ->orderBy('transaction_date')
            ->get();

        return response()->json([
            'transactions' => $transactions,
            'meta' => [
                'start_date' => $request->start_date,
                'end_date'   => $request->end_date,
            ]
        ]);
    }
}