import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPdf(transactions, meta) {
    const doc = new jsPDF();
    let totalIncome = 0;
    let totalExpense = 0;

    // Helper untuk format rupiah
    const formatRupiah = (num) => {
        return Number(num).toLocaleString("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    doc.setFontSize(14);
    doc.text("LAPORAN KEUANGAN DOMPET PINTAR", 105, 15, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Periode: ${meta.start_date} s/d ${meta.end_date}`, 105, 22, { align: "center" });

    const rows = transactions.map(trx => {
        const amount = Number(trx.amount) || 0; // Cast ke Number
        const isIncome = trx.category?.type === "income";

        if (isIncome) totalIncome += amount;
        else totalExpense += amount;

        return [
            trx.transaction_date,
            `${trx.category?.name ?? "N/A"} (${isIncome ? "Masuk" : "Keluar"})`,
            trx.description ?? "-",
            `${isIncome ? "+" : "-"} ${formatRupiah(amount)}`,
        ];
    });

    autoTable(doc, {
        startY: 30,
        head: [["Tanggal", "Kategori", "Keterangan", "Nominal"]],
        body: rows,
        headStyles: { fillColor: [238, 238, 238], textColor: 20, fontStyle: "bold" },
        columnStyles: { 3: { halign: "right" } }
    });

    const endY = doc.lastAutoTable.finalY + 10;

    // Bagian Summary (Total)
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Pemasukan   : Rp ${formatRupiah(totalIncome)}`, 14, endY);
    doc.text(`Total Pengeluaran  : Rp ${formatRupiah(totalExpense)}`, 14, endY + 7);
    
    // Background kotak untuk Sisa Saldo
    const finalBalance = totalIncome - totalExpense;
    doc.setFillColor(243, 244, 246);
    doc.rect(13, endY + 11, 80, 8, 'F');
    doc.text(`Sisa Saldo                : Rp ${formatRupiah(finalBalance)}`, 14, endY + 17);

    doc.save("Laporan_Keuangan.pdf");
}