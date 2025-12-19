<?php

namespace App\Http\Controllers;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TransactionsExport;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::where('user_id', Auth::id())->with('category');
        
        // --- 1. FILTER PERIODE ---
        $period = $request->input('period', 'month'); 
        $now = Carbon::now();

        if ($period === 'day') {
            $query->whereDate('transaction_date', $now->today());
        } elseif ($period === 'week') {
            $query->whereBetween('transaction_date', [$now->copy()->subDays(6), $now]);
        } elseif ($period === 'month') {
            $query->whereMonth('transaction_date', $now->month)
                  ->whereYear('transaction_date', $now->year);
        } elseif ($period === 'year') {
            $query->whereYear('transaction_date', $now->year);
        }

        // --- 2. FILTER SEARCH, TYPE, CATEGORY ---
        if ($request->filled('search')) {
            $query->where('description', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('type') && $request->type !== 'all') {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('type', $request->type);
            });
        }
        if ($request->filled('category_id') && $request->category_id !== 'all') {
            $query->where('category_id', $request->category_id);
        }

        // --- 3. LOGIKA SORTING (URUTAN) ---
        $sort = $request->input('sort', 'newest'); 

        if ($sort === 'oldest') {
            $query->orderBy('transaction_date', 'asc');
        } elseif ($sort === 'a_z') {
            $query->orderBy('description', 'asc');
        } elseif ($sort === 'z_a') {
            $query->orderBy('description', 'desc');
        } else {
            $query->orderBy('transaction_date', 'desc');
        }

        // --- AMBIL DATA ---
        $transactions = $query->paginate(5)
                              ->withQueryString();
                              
        // Hitung Summary
        $totalIncome = $transactions->where('category.type', 'income')->sum('amount');
        $totalExpense = $transactions->where('category.type', 'expense')->sum('amount');
        $balance = $totalIncome - $totalExpense;

        $allCategories = \App\Models\Category::all();

        return Inertia::render('Dashboard', [
            'transactions' => $transactions,
            'categories' => $allCategories,
            'filters' => $request->all(['period', 'search', 'type', 'category_id', 'sort']),
            'summary' => [
                'income' => $totalIncome,
                'expense' => $totalExpense,
                'balance' => $balance
            ]
        ]);
    }

    // --- FUNGSI CREATE & STORE ---

    public function create()
    {
        $categories = \App\Models\Category::all();
        
        return Inertia::render('Transactions/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1000',
            'description' => 'required|string|max:255',
            'transaction_date' => 'required|date',
        ]);

        $request->user()->transactions()->create($validated);

        // UPDATE: Tambahkan pesan sukses
        return redirect()->route('dashboard')->with('message', 'Transaksi berhasil disimpan! 💾');
    }

    // --- FUNGSI EDIT, UPDATE, DELETE ---

    public function edit($id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Transactions/Edit', [
            'transaction' => $transaction,
            'categories' => \App\Models\Category::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1000',
            'description' => 'required|string|max:255',
            'transaction_date' => 'required|date',
        ]);

        $transaction->update($validated);

        // UPDATE: Tambahkan pesan sukses
        return redirect()->route('dashboard')->with('message', 'Data berhasil diperbarui! ✏️');
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);

        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }

        $transaction->delete();

        // UPDATE: Tambahkan pesan sukses
        return redirect()->route('dashboard')->with('message', 'Data berhasil dihapus! 🗑️');
    }

    // --- FUNGSI HALAMAN STATISTIK ---
    public function stats(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth()->toDateString());
        
        $diffInDays = Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate));
        $groupBy = $diffInDays > 32 ? 'month' : 'day';

        $transactions = Transaction::where('user_id', Auth::id())
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->with('category')
            ->orderBy('transaction_date')
            ->get();

        $trendData = [];
        $incomeCats = [];
        $expenseCats = [];
        $totalIncome = 0;
        $totalExpense = 0;

        foreach ($transactions as $trx) {
            $date = Carbon::parse($trx->transaction_date);
            $key = $groupBy === 'month' ? $date->format('Y-m') : $date->format('d M');

            if (!isset($trendData[$key])) {
                $trendData[$key] = ['income' => 0, 'expense' => 0];
            }

            $catName = $trx->category->name;

            if ($trx->category->type === 'income') {
                $trendData[$key]['income'] += $trx->amount;
                $totalIncome += $trx->amount;
                if (!isset($incomeCats[$catName])) $incomeCats[$catName] = 0;
                $incomeCats[$catName] += $trx->amount;
            } else {
                $trendData[$key]['expense'] += $trx->amount;
                $totalExpense += $trx->amount;
                if (!isset($expenseCats[$catName])) $expenseCats[$catName] = 0;
                $expenseCats[$catName] += $trx->amount;
            }
        }

        return Inertia::render('Stats', [
            'chartData' => [
                'labels' => array_keys($trendData),
                'incomes' => array_column($trendData, 'income'),
                'expenses' => array_column($trendData, 'expense'),
            ],
            'categoryData' => [
                'income' => [
                    'labels' => array_keys($incomeCats),
                    'data' => array_values($incomeCats),
                ],
                'expense' => [
                    'labels' => array_keys($expenseCats),
                    'data' => array_values($expenseCats),
                ],
            ],
            'summaryTotal' => [
                'income' => $totalIncome,
                'expense' => $totalExpense,
            ],
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }

    // --- FITUR EKSPOR LAPORAN ---

    public function exportForm()
    {
        return Inertia::render('Export', [
            'categories' => \App\Models\Category::all()
        ]);
    }

    // public function exportProcess(Request $request)
    // {
    //     $request->validate([
    //         'start_date' => 'required|date',
    //         'end_date' => 'required|date',
    //         'format' => 'required|in:xlsx,pdf',
    //     ]);

    //     $filters = $request->all();
    //     $namaFile = 'Laporan_Keuangan_' . date('Ymd_His');

    //     if ($request->input('format') === 'pdf') {
    //         return Excel::download(new TransactionsExport($filters), $namaFile . '.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    //     } else {
    //         return Excel::download(new TransactionsExport($filters), $namaFile . '.xlsx');
    //     }
    // }
    public function exportProcess(Request $request)
{
    // Cek apakah database bisa diakses
    $count = \App\Models\Transaction::count();
    
    // Tes ekspor file Excel kosong dulu
    return Excel::download(new class {
        public function collection() { return collect([]); }
    }, 'test.xlsx');
}
}