<table>
    <thead>
        <tr>
            <th colspan="4" style="text-align: center; font-weight: bold; font-size: 14px;">
                LAPORAN KEUANGAN DOMPET PINTAR
            </th>
        </tr>
        <tr>
            <td colspan="4" style="text-align: center;">
                Periode: {{ $filters['start_date'] }} s/d {{ $filters['end_date'] }}
            </td>
        </tr>
        <tr></tr>
        <tr style="background-color: #eeeeee;">
            <th style="border: 1px solid #000; font-weight: bold;">Tanggal</th>
            <th style="border: 1px solid #000; font-weight: bold;">Kategori</th>
            <th style="border: 1px solid #000; font-weight: bold;">Keterangan</th>
            <th style="border: 1px solid #000; font-weight: bold;">Nominal</th>
        </tr>
    </thead>
    <tbody>
        @php $totalIncome = 0; $totalExpense = 0; @endphp
        @foreach($transactions as $trx)
            <tr>
                <td style="border: 1px solid #000;">{{ $trx->transaction_date }}</td>
                <td style="border: 1px solid #000;">{{ $trx->category->name }} ({{ $trx->category->type == 'income' ? 'Masuk' : 'Keluar' }})</td>
                <td style="border: 1px solid #000;">{{ $trx->description }}</td>
                <td style="border: 1px solid #000; text-align: right;">
                    {{ $trx->category->type == 'expense' ? '-' : '+' }} 
                    {{ number_format($trx->amount, 0, ',', '.') }}
                    
                    @php 
                        if($trx->category->type == 'income') $totalIncome += $trx->amount;
                        else $totalExpense += $trx->amount;
                    @endphp
                </td>
            </tr>
        @endforeach
        <tr></tr>
        <tr>
            <td colspan="3" style="text-align: right; font-weight: bold;">Total Pemasukan:</td>
            <td style="font-weight: bold;">Rp {{ number_format($totalIncome, 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: right; font-weight: bold;">Total Pengeluaran:</td>
            <td style="font-weight: bold;">Rp {{ number_format($totalExpense, 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: right; font-weight: bold;">Sisa Saldo:</td>
            <td style="font-weight: bold;">Rp {{ number_format($totalIncome - $totalExpense, 0, ',', '.') }}</td>
        </tr>
    </tbody>
</table>