import * as XLSX from "xlsx";

export function exportExcel(transactions, meta) {
    let totalIncome = 0;
    let totalExpense = 0;

    const sheetData = [
        ["LAPORAN KEUANGAN DOMPET PINTAR"],
        [`Periode: ${meta.start_date} s/d ${meta.end_date}`],
        [],
        ["Tanggal", "Kategori", "Keterangan", "Nominal"]
    ];

    transactions.forEach(trx => {
        // PASTIKAN jadi angka dengan Number() atau parseFloat()
        const amount = Number(trx.amount) || 0; 
        const isIncome = trx.category?.type === "income";

        if (isIncome) totalIncome += amount;
        else totalExpense += amount;

        sheetData.push([
            trx.transaction_date,
            `${trx.category?.name ?? "N/A"} (${isIncome ? "Masuk" : "Keluar"})`,
            trx.description ?? "-",
            isIncome ? amount : -amount // Gunakan angka asli (negatif jika pengeluaran)
        ]);
    });

    sheetData.push([]);
    sheetData.push(["", "", "Total Pemasukan", totalIncome]);
    sheetData.push(["", "", "Total Pengeluaran", totalExpense]);
    sheetData.push(["", "", "Sisa Saldo", totalIncome - totalExpense]);

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Formating kolom Nominal agar muncul format ribuan di Excel
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let i = 4; i <= range.e.r; i++) {
        const cell = worksheet[XLSX.utils.encode_cell({r: i, c: 3})];
        if (cell && typeof cell.v === 'number') {
            cell.z = '#,##0'; // Format angka ribuan Excel
        }
    }

    // Merge & Cols config
    worksheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }
    ];
    worksheet["!cols"] = [{ wch: 15 }, { wch: 25 }, { wch: 30 }, { wch: 15 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
    XLSX.writeFile(workbook, "Laporan_Keuangan.xlsx");
}