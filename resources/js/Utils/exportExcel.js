import * as XLSX from "xlsx";

export function exportExcel(transactions, meta) {
    let totalIncome = 0;
    let totalExpense = 0;

    // Judul & Header
    const sheetData = [
        ["LAPORAN KEUANGAN DOMPET PINTAR"],
        [`Periode: ${meta.start_date} s/d ${meta.end_date}`],
        [],
        ["TANGGAL", "KATEGORI", "KETERANGAN", "NOMINAL"]
    ];

    transactions.forEach(trx => {
        const amount = Number(trx.amount) || 0;
        const isIncome = trx.category?.type === "income";

        if (isIncome) totalIncome += amount;
        else totalExpense += amount;

        sheetData.push([
            trx.transaction_date,
            `${trx.category?.name ?? "N/A"} (${isIncome ? "Masuk" : "Keluar"})`,
            trx.description ?? "-",
            isIncome ? amount : -amount // Biarkan sebagai angka murni
        ]);
    });

    // Baris Total
    sheetData.push([], []);
    sheetData.push(["", "", "TOTAL PEMASUKAN", totalIncome]);
    sheetData.push(["", "", "TOTAL PENGELUARAN", totalExpense]);
    sheetData.push(["", "", "SISA SALDO", totalIncome - totalExpense]);

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // ===== STYLING TINGKAT LANJUT (Format Angka) =====
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let i = 4; i <= range.e.r; i++) {
        const cellAddress = XLSX.utils.encode_cell({ r: i, c: 3 });
        if (!worksheet[cellAddress]) continue;

        // Berikan format Accounting Rupiah
        worksheet[cellAddress].t = 'n'; // Type: Number
        worksheet[cellAddress].z = '"Rp "#,##0'; // Format: Rp 100.000
    }

    // Lebar Kolom Otomatis
    worksheet["!cols"] = [{ wch: 15 }, { wch: 25 }, { wch: 35 }, { wch: 20 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Keuangan");
    XLSX.writeFile(workbook, `Laporan_${meta.start_date}.xlsx`);
}