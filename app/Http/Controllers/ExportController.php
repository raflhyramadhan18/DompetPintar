<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class ExportController extends Controller
{
    public function data(Request $request)
    {
        // 🔒 validasi
        $request->validate([
            'start_date' => 'required|date',
            'end_date'   => 'required|date',
        ]);

        $query = Transaction::with('category')
            ->where('user_id', Auth::id())
            ->whereBetween('transaction_date', [
                $request->start_date,
                $request->end_date
            ]);

        // 🔍 filter kategori
        if ($request->category_mode === 'income') {
            $query->whereHas('category', fn($q) => $q->where('type', 'income'));
        }

        if ($request->category_mode === 'expense') {
            $query->whereHas('category', fn($q) => $q->where('type', 'expense'));
        }

        if (
            $request->category_mode === 'custom'
            && is_array($request->categories)
        ) {
            $query->whereIn('category_id', $request->categories);
        }

        $transactions = $query
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
