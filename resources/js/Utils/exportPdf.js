import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPdf(transactions, meta) {
    const doc = new jsPDF();
    let totalIncome = 0;
    let totalExpense = 0;

    const formatRupiah = (num) => Number(num).toLocaleString("id-ID");

    // ===== HEADER =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(63, 81, 181); // Warna Indigo
    doc.text("LAPORAN KEUANGAN", 105, 15, { align: "center" });
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text(`Periode: ${meta.start_date} s/d ${meta.end_date}`, 105, 22, { align: "center" });

    // ===== PREPARE DATA =====
    const rows = transactions.map(trx => {
        const amount = Number(trx.amount) || 0;
        const isIncome = trx.category?.type === "income";
        
        if (isIncome) totalIncome += amount;
        else totalExpense += amount;

        return [
            trx.transaction_date,
            trx.category?.name ?? "N/A",
            trx.description ?? "-",
            { 
                content: `${isIncome ? "+" : "-"} Rp ${formatRupiah(amount)}`, 
                styles: { textColor: isIncome ? [46, 125, 50] : [211, 47, 47], fontStyle: 'bold' } 
            }
        ];
    });

    // ===== TABEL =====
    autoTable(doc, {
        startY: 30,
        head: [["Tanggal", "Kategori", "Keterangan", "Nominal"]],
        body: rows,
        theme: 'striped', // Memberi warna selang-seling pada baris
        headStyles: { fillColor: [63, 81, 181], textColor: [255, 255, 255], fontSize: 10 },
        columnStyles: { 3: { halign: "right" } },
        styles: { fontSize: 9, cellPadding: 4 }
    });

    // ===== SUMMARY SECTION =====
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    
    // Kotak Ringkasan
    doc.setDrawColor(200);
    doc.line(14, finalY, 196, finalY); // Garis pemisah

    doc.setFont(undefined, 'normal');
    doc.text("Total Pemasukan", 120, finalY + 10);
    doc.setTextColor(46, 125, 50);
    doc.text(`Rp ${formatRupiah(totalIncome)}`, 196, finalY + 10, { align: "right" });

    doc.setTextColor(0);
    doc.text("Total Pengeluaran", 120, finalY + 17);
    doc.setTextColor(211, 47, 47);
    doc.text(`Rp ${formatRupiah(totalExpense)}`, 196, finalY + 17, { align: "right" });

    doc.setDrawColor(63, 81, 181);
    doc.setLineWidth(0.5);
    doc.line(120, finalY + 20, 196, finalY + 20);

    doc.setFont(undefined, 'bold');
    doc.setTextColor(0);
    doc.text("SISA SALDO", 120, finalY + 26);
    doc.text(`Rp ${formatRupiah(totalIncome - totalExpense)}`, 196, finalY + 26, { align: "right" });

    doc.save(`Laporan_Keuangan_${meta.start_date}.pdf`);
}