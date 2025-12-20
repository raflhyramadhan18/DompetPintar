import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPdf(transactions, meta) {
    const doc = new jsPDF();

    let totalIncome = 0;
    let totalExpense = 0;

    // ===== JUDUL =====
    doc.setFontSize(14);
    doc.text("LAPORAN KEUANGAN DOMPET PINTAR", 105, 15, { align: "center" });

    doc.setFontSize(10);
    doc.text(
        `Periode: ${meta.start_date} s/d ${meta.end_date}`,
        105,
        22,
        { align: "center" }
    );

    // ===== TABLE DATA =====
    const rows = transactions.map(trx => {
        const isIncome = trx.category?.type === "income";

        if (isIncome) totalIncome += trx.amount;
        else totalExpense += trx.amount;

        return [
            trx.transaction_date,
            `${trx.category?.name ?? "N/A"} (${isIncome ? "Masuk" : "Keluar"})`,
            trx.description ?? "-",
            `${isIncome ? "+" : "-"} ${trx.amount.toLocaleString("id-ID")}`,
        ];
    });

    autoTable(doc, {
        startY: 30,
        head: [[
            "Tanggal",
            "Kategori",
            "Keterangan",
            "Nominal"
        ]],
        body: rows,
        styles: {
            fontSize: 9,
            cellPadding: 3,
        },
        headStyles: {
            fillColor: [238, 238, 238],
            textColor: 20,
            fontStyle: "bold"
        },
        columnStyles: {
            3: { halign: "right" }
        }
    });

    const endY = doc.lastAutoTable.finalY + 6;

    // ===== TOTAL =====
    doc.setFontSize(10);
    doc.text(`Total Pemasukan : Rp ${totalIncome.toLocaleString("id-ID")}`, 14, endY);
    doc.text(`Total Pengeluaran : Rp ${totalExpense.toLocaleString("id-ID")}`, 14, endY + 6);
    doc.text(
        `Sisa Saldo : Rp ${(totalIncome - totalExpense).toLocaleString("id-ID")}`,
        14,
        endY + 12
    );

    doc.save("Laporan_Keuangan.pdf");
}
