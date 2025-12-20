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
        const isIncome = trx.category?.type === "income";

        if (isIncome) totalIncome += trx.amount;
        else totalExpense += trx.amount;

        sheetData.push([
            trx.transaction_date,
            `${trx.category?.name ?? "N/A"} (${isIncome ? "Masuk" : "Keluar"})`,
            trx.description ?? "-",
            (isIncome ? "+" : "-") + trx.amount
        ]);
    });

    sheetData.push([]);
    sheetData.push(["", "", "Total Pemasukan", totalIncome]);
    sheetData.push(["", "", "Total Pengeluaran", totalExpense]);
    sheetData.push(["", "", "Sisa Saldo", totalIncome - totalExpense]);

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // merge judul
    worksheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }
    ];

    worksheet["!cols"] = [
        { wch: 15 },
        { wch: 25 },
        { wch: 30 },
        { wch: 15 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

    XLSX.writeFile(workbook, "Laporan_Keuangan.xlsx");
}
