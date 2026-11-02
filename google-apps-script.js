/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: PENDAFTARAN & DASHBOARD DATABASE DEEN IN LOVE SERIES
 * "BELAJAR SEBELUM BERLAYAR" — PRE MARRIAGE, DEEN PREPARED
 * Pemateri: Ustadz Mahruroji | Diselenggarakan oleh UM Official
 * Portal Resmi: s.id/deeninloveseries
 * =========================================================================
 * 
 * ✨ FITUR DESAIN SPREADSHEET PREMIUM:
 * 1. 📊 TAB "DASHBOARD & REKAP":
 *    - Kartu Metrik KPI: Total Peserta Terdaftar, Total Dana Masuk (Kas),
 *      Total Ikhwan & Akhwat, Rekap Single vs Duda/Janda, Kehadiran Offline vs Online.
 *    - Tabel Rekapitulasi Paket Registrasi (Ikhwan vs Akhwat @ Rp 500.000).
 *    - Tabel Rekapitulasi Status Kepesertaan (Ikhwan, Akhwat, Janda, Duda).
 *    - Tabel Rekapitulasi Mode Kehadiran Hybrid (Offline Masjid vs Online Zoom).
 *    - Tabel Rekapitulasi Skema Pembayaran (Lunas 100% vs Bertahap 3x Bayar).
 * 
 * 2. 👥 TAB "DATA PESERTA" (MASTER DATABASE):
 *    - Header Eksklusif bertema Deep Ocean Midnight Teal & Luminous Cyan (#042230 & #2dd4bf).
 *    - Freeze Header & Filter Baris Otomatis.
 *    - Pemisahan Kolom Mandiri: Usia (Tahun) & Pendidikan Terakhir.
 *    - Kolom Status Kepesertaan: Ikhwan, Akhwat, Janda, Duda.
 *    - Pewarnaan Baris Selang-Seling (Zebra Striping) bernuansa ice-tint lembut.
 *    - Format Otomatis Mata Uang Rupiah (Rp #,##0) pada kolom Biaya Registrasi.
 *    - Link Klik Langsung WhatsApp (1-Click Chat) ke nomor peserta.
 *    - Pewarnaan Kondisional Otomatis:
 *      • LUNAS: Hijau Mint (#dcfce7 / #15803d)
 *      • BERTAHAP (3X): Warm Amber (#fef3c7 / #b45309)
 *      • Ikhwan: Biru Langit (#e0f2fe / #0369a1)
 *      • Akhwat: Mawar Lembut (#fce7f3 / #be185d)
 *      • Janda / Duda: Warm Amber (#fef3c7 / #b45309)
 *      • Hadir Offline Masjid: Hijau Zamrud (#ecfdf5 / #047857)
 *      • Hadir Online Zoom: Indigo/Biru (#e0e7ff / #3730a3)
 * 
 * 3. 🕌 TAB "PRESENSI 6 PERTEMUAN":
 *    - Monitoring Kehadiran 6 Pekan Materi Pranikah + Rihlah Bersama.
 *    - Checklist Interaktif (Checkbox):
 *      P1 (6 Des), P2 (13 Des), P3 (20 Des), P4 (27 Des), P5 (3 Jan), P6 (10 Jan), Rihlah (17 Jan).
 *    - Checklist Hak Buku "Pulih Bersama Allah" & Sertifikat Kelulusan.
 *    - Link WhatsApp langsung untuk koordinasi presensi & tautan Zoom.
 * 
 * 4. ⛵ MENU KHUSUS DI GOOGLE SHEETS:
 *    - Saat spreadsheet dibuka, muncul menu "⛵ Deen In Love" di bar menu atas.
 *    - Satu klik "🎨 Desain Ulang & Percantik Spreadsheet" untuk auto-format!
 * 
 * =========================================================================
 * PANDUAN PEMASANGAN CEPAT:
 * =========================================================================
 * 1. Buka Google Spreadsheet Anda.
 * 2. Klik menu: Extensions (Ekstensi) > Apps Script.
 * 3. Hapus seluruh kode bawaan editor, lalu PASTE SELURUH KODE DI BAWAH INI.
 * 4. Pilih fungsi "setupSpreadsheetLengkap" pada dropdown di toolbar atas > Klik "Run" (Jalankan).
 *    (Berikan izin/otorisasi akun Google Anda jika diminta).
 *    -> Seketika spreadsheet Anda akan berubah menjadi Dashboard & Database Cantik!
 * 5. Klik tombol "Deploy" (Terapkan) warna biru di pojok kanan atas > Pilih "New deployment".
 * 6. Pada ikon gerigi "Select type", pilih "Web app".
 * 7. Pengaturan:
 *    - Description: "Web App Pendaftaran Deen In Love Series"
 *    - Execute as: "Me" (Email Google Anda)
 *    - Who has access: "Anyone" (Siapa saja)
 * 8. Web App URL Aktif:
 *    https://script.google.com/macros/s/AKfycbzvXQTvnjoksSrwN4D6FLN1rDREH-gaPzl1QPdzPzmTXPI_b8Dc6SylzhHt7O576HzfPg/exec
 * =========================================================================
 */

// =============================================================================
// 1. MENU KHUSUS GOOGLE SHEETS (DITAMPILKAN OTOMATIS SAAT SPREADSHEET DIBUKA)
// =============================================================================
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("⛵ Deen In Love")
    .addItem("🎨 Desain Ulang & Percantik Spreadsheet", "setupSpreadsheetLengkap")
    .addItem("📊 Perbarui Rumus Dashboard Rekap", "buatTabDashboard")
    .addItem("🕌 Perbarui Lembar Presensi 6 Pertemuan", "buatTabPresensi")
    .addSeparator()
    .addItem("🧪 Masukkan Data Contoh (Simulasi)", "isiDataSimulasi")
    .addToUi();
}

// =============================================================================
// 2. WEBHOOK POST (MENERIMA KIRIMAN DATA DARI FORMULIR PENDAFTARAN)
// =============================================================================
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("👥 Data Peserta");

    // Jika spreadsheet belum diinisialisasi atau sheet data belum ada, buat desain lengkapnya
    if (!sheet || sheet.getLastRow() < 3) {
      setupSpreadsheetLengkap(doc);
      sheet = doc.getSheetByName("👥 Data Peserta");
    }

    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();

    // Proteksi Anti-Duplikat berdasarkan kodeRegistrasi
    var lastRow = sheet.getLastRow();
    if (lastRow >= 4 && data.kodeRegistrasi) {
      var existingCodes = sheet.getRange(4, 2, lastRow - 3, 1).getValues();
      for (var r = 0; r < existingCodes.length; r++) {
        if (existingCodes[r][0] && existingCodes[r][0].toString() === data.kodeRegistrasi.toString()) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "Data pendaftaran dengan kode " + data.kodeRegistrasi + " sudah tersimpan sebelumnya (duplikat diabaikan)",
            count: 0
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    var nominalAngka = parseNominal(data.nominalBayar || data.nominal || 500000);
    var skema = data.skemaPembayaran || "";
    var isBertahap = (skema.indexOf("Bertahap") !== -1 || skema.indexOf("3x") !== -1 || skema.indexOf("DP") !== -1);
    var statusBayar = isBertahap ? "BERTAHAP (Tahap 1 • Sisa 2x)" : "LUNAS";

    // Masukkan setiap peserta ke dalam baris tabel
    if (data.explorers && data.explorers.length > 0) {
      var startRow = sheet.getLastRow() + 1;
      var newRows = [];

      data.explorers.forEach(function (exp, idx) {
        var isLeader = (idx === 0);
        var noUrut = sheet.getLastRow() - 2 + idx; // Nomor urut peserta

        var hpFormatted = formatPhoneSpreadsheet(exp.hp || (isLeader ? data.leaderHp : ""));

        var row = [
          noUrut,                                                 // Kolom 1: No
          data.kodeRegistrasi || "",                              // Kolom 2: Kode Registrasi
          timestamp,                                              // Kolom 3: Waktu Pendaftaran
          data.eventNama || "Deen In Love Series",                 // Kolom 4: Program / Seri
          data.paketTrekking || "Ikhwan (500K)",                  // Kolom 5: Kategori Paket
          nominalAngka,                                           // Kolom 6: Biaya Registrasi
          statusBayar,                                            // Kolom 7: Status Pembayaran
          exp.nama || "",                                         // Kolom 8: Nama Lengkap
          exp.peran || "Ikhwan",                                  // Kolom 9: Status Kepesertaan (Ikhwan / Akhwat / Janda / Duda)
          exp.gender || "-",                                      // Kolom 10: Jenis Kelamin
          exp.usia || "-",                                        // Kolom 11: Usia (Thn)
          exp.pendidikan || "-",                                  // Kolom 12: Pendidikan Terakhir
          exp.medis || "-",                                       // Kolom 13: Pekerjaan / Aktivitas
          hpFormatted,                                            // Kolom 14: No. WhatsApp
          exp.email || (isLeader ? data.leaderEmail : ""),        // Kolom 15: Email
          data.kotaDomisili || data.alamatLengkap || "-",         // Kolom 16: Kota & Alamat Domisili
          data.transportasi || "-",                               // Kolom 17: Status Kesiapan Menikah
          data.pengalamanTrek || "-",                             // Kolom 18: Pengalaman Kajian Pranikah
          data.intensitasOlahraga || "-",                         // Kolom 19: Fokus Utama Belajar
          data.titikKumpul || "-",                                // Kolom 20: Mode Kehadiran (Hybrid)
          data.buktiTransferFileName || "Struk Bukti Terlampir",  // Kolom 21: Bukti Transfer
          ""                                                      // Kolom 22: Link WhatsApp (diisi formula)
        ];
        newRows.push(row);
      });

      // Tulis sekaligus untuk kecepatan maksimal
      var targetRange = sheet.getRange(startRow, 1, newRows.length, newRows[0].length);
      targetRange.setValues(newRows);

      // Terapkan styling baris yang rapi & estetik
      formatDataRows(sheet, startRow, newRows.length);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Alhamdulillah! Data peserta Deen In Love Series berhasil dicatat di Google Spreadsheet.",
      count: data.explorers ? data.explorers.length : 1
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "⛵ Endpoint Google Apps Script Deen In Love Series (UM Official) Aktif!\n" +
    "Database siap menerima kiriman pendaftaran dari portal web s.id/deeninloveseries."
  ).setMimeType(ContentService.MimeType.TEXT);
}

// =============================================================================
// 3. MASTER SETUP DESAIN SPREADSHEET LENGKAP
// =============================================================================
function setupSpreadsheetLengkap(docInstance) {
  var doc = docInstance || SpreadsheetApp.getActiveSpreadsheet();

  // 1. Buat & Format Tab Data Peserta (Master Database)
  buatTabDataPeserta(doc);

  // 2. Buat & Format Tab Dashboard & Rekap
  buatTabDashboard(doc);

  // 3. Buat & Format Tab Presensi 6 Pertemuan
  buatTabPresensi(doc);

  // Jadikan Tab Dashboard sebagai tampilan utama yang aktif
  var dashSheet = doc.getSheetByName("📊 DASHBOARD & REKAP");
  if (dashSheet) {
    doc.setActiveSheet(dashSheet);
  }

  // Tampilkan notifikasi jika dijalankan manual dari menu
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Desain Spreadsheet Deen In Love Series berhasil diterapkan! Tab Dashboard, Data Peserta & Presensi siap digunakan.",
      "⛵ Desain Sukses",
      5
    );
  } catch (e) { }
}

// =============================================================================
// 4. PEMBUATAN & STYLING TAB "👥 DATA PESERTA"
// =============================================================================
function buatTabDataPeserta(doc) {
  var sheetName = "👥 Data Peserta";
  var sheet = doc.getSheetByName(sheetName);

  if (!sheet) {
    sheet = doc.insertSheet(sheetName);
  }

  // Bersihkan sheet jika masih baru (baris < 3)
  if (sheet.getLastRow() < 3) {
    sheet.clear();

    // BARIS 1: BANNER JUDUL RESMI
    sheet.getRange("A1:V1").merge()
      .setValue("⛵ DEEN IN LOVE SERIES: BELAJAR SEBELUM BERLAYAR (UM OFFICIAL) — MASTER DATABASE PENDAFTARAN PESERTA")
      .setFontFamily("Arial")
      .setFontSize(12)
      .setFontWeight("bold")
      .setFontColor("#2dd4bf")
      .setBackground("#042230")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setRowHeight(1, 38);

    // BARIS 2: PANDUAN WARNA (LEGEND PILL)
    sheet.getRange("A2:V2").merge()
      .setValue("💡 PANDUAN WARNA:  [HIJAU MINT] Pembayaran Lunas (100%)  •  [BIRU] Ikhwan  •  [ROSE] Akhwat  •  [AMBER] Janda/Duda  •  [ZAMRUD] Hadir Offline Masjid  •  [INDIGO] Hadir Online Zoom")
      .setFontFamily("Arial")
      .setFontSize(8.5)
      .setFontColor("#cbd5e1")
      .setBackground("#062e3d")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setRowHeight(2, 24);

    // BARIS 3: HEADER KOLOM (22 KOLOM)
    var headers = [
      "No",
      "Kode Registrasi",
      "Waktu Pendaftaran",
      "Program / Seri",
      "Kategori Paket",
      "Biaya Registrasi",
      "Status Bayar",
      "Nama Lengkap Peserta",
      "Status Kepesertaan",
      "Jenis Kelamin",
      "Usia (Thn)",
      "Pendidikan Terakhir",
      "Pekerjaan / Aktivitas",
      "No. WhatsApp",
      "Email",
      "Kota & Alamat Domisili",
      "Status Kesiapan Menikah",
      "Pengalaman Kajian",
      "Fokus Utama Belajar",
      "Mode Kehadiran",
      "Bukti Transfer",
      "Link WhatsApp"
    ];

    var headerRange = sheet.getRange(3, 1, 1, headers.length);
    headerRange.setValues([headers])
      .setFontFamily("Arial")
      .setFontSize(9.5)
      .setFontWeight("bold")
      .setFontColor("#ffffff")
      .setBackground("#0a3d52")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle")
      .setWrap(true);
    sheet.setRowHeight(3, 36);

    // Bekukan 3 baris teratas dan kolom Kode Registrasi
    sheet.setFrozenRows(3);
    sheet.setFrozenColumns(2);

    // Atur lebar kolom yang proporsional & nyaman dibaca
    var widths = [
      45,   // 1. No
      130,  // 2. Kode Registrasi
      140,  // 3. Waktu Pendaftaran
      160,  // 4. Program / Seri
      150,  // 5. Kategori Paket
      120,  // 6. Biaya Registrasi
      115,  // 7. Status Bayar
      180,  // 8. Nama Lengkap Peserta
      135,  // 9. Status Kepesertaan
      130,  // 10. Jenis Kelamin
      75,   // 11. Usia (Thn)
      140,  // 12. Pendidikan Terakhir
      160,  // 13. Pekerjaan / Aktivitas
      135,  // 14. No. WhatsApp
      160,  // 15. Email
      190,  // 16. Domisili
      160,  // 17. Status Kesiapan
      150,  // 18. Pengalaman Kajian
      160,  // 19. Fokus Belajar
      180,  // 20. Mode Kehadiran
      150,  // 21. Bukti Transfer
      125   // 22. Link WhatsApp
    ];
    for (var c = 0; c < widths.length; c++) {
      sheet.setColumnWidth(c + 1, widths[c]);
    }

    // Pasang Aturan Format Bersyarat (Conditional Formatting)
    pasangFormatBersyarat(sheet);
  }

  return sheet;
}

// Format baris data baru agar rapi, memiliki border halus & number format mata uang
function formatDataRows(sheet, startRow, rowCount) {
  var range = sheet.getRange(startRow, 1, rowCount, 22);
  range.setFontFamily("Arial")
    .setFontSize(9)
    .setVerticalAlignment("middle");

  // Format Angka Mata Uang Rupiah untuk Biaya
  sheet.getRange(startRow, 6, rowCount, 1).setNumberFormat('"Rp"#,##0');
  sheet.getRange(startRow, 3, rowCount, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");

  // Alignment per kolom
  sheet.getRange(startRow, 1, rowCount, 1).setHorizontalAlignment("center"); // No
  sheet.getRange(startRow, 2, rowCount, 1).setHorizontalAlignment("center").setFontWeight("bold"); // Kode
  sheet.getRange(startRow, 3, rowCount, 1).setHorizontalAlignment("center"); // Waktu
  sheet.getRange(startRow, 6, rowCount, 1).setHorizontalAlignment("right").setFontWeight("bold");  // Biaya
  sheet.getRange(startRow, 7, rowCount, 1).setHorizontalAlignment("center").setFontWeight("bold"); // Status Bayar
  sheet.getRange(startRow, 9, rowCount, 3).setHorizontalAlignment("center"); // Status, Gender, Usia
  sheet.getRange(startRow, 14, rowCount, 1).setHorizontalAlignment("center"); // WA
  sheet.getRange(startRow, 20, rowCount, 1).setHorizontalAlignment("center"); // Mode Kehadiran
  sheet.getRange(startRow, 22, rowCount, 1).setHorizontalAlignment("center").setFontWeight("bold"); // Link WA

  // Border abu-abu halus antar sel
  range.setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID);

  // Pewarnaan baris selang-seling (Zebra striping) & Pasang Formula Link WA
  for (var i = 0; i < rowCount; i++) {
    var currentRow = startRow + i;
    sheet.setRowHeight(currentRow, 26);
    var bg = (currentRow % 2 === 0) ? "#ffffff" : "#f4f9fb";
    sheet.getRange(currentRow, 1, 1, 22).setBackground(bg);

    // Formula Link WhatsApp langsung ke nomor di kolom N (14)
    sheet.getRange(currentRow, 22).setFormula(
      '=IF(AND(N' + currentRow + '<>""; N' + currentRow + '<>"-"); HYPERLINK("https://wa.me/" & SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(N' + currentRow + '; " "; ""); "-"; ""); "+"; ""); "\'"; ""); "💬 Chat WA"); "")'
    );
  }
}

// Pasang Aturan Highlight Otomatis
function pasangFormatBersyarat(sheet) {
  var rules = sheet.getConditionalFormatRules();

  // 1. Highlight LUNAS -> Latar Hijau Muda, Teks Hijau Tua Tebal
  var ruleLunas = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("LUNAS")
    .setBackground("#dcfce7")
    .setFontColor("#15803d")
    .setBold(true)
    .setRanges([sheet.getRange("G4:G")])
    .build();

  // 1b. Highlight BERTAHAP -> Latar Warm Amber, Teks Cokelat Tua Tebal
  var ruleBertahap = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("BERTAHAP")
    .setBackground("#fef3c7")
    .setFontColor("#b45309")
    .setBold(true)
    .setRanges([sheet.getRange("G4:G")])
    .build();

  // 2. Highlight Status: Ikhwan -> Latar Biru Langit Lembut
  var ruleIkhwan = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Ikhwan")
    .setBackground("#e0f2fe")
    .setFontColor("#0369a1")
    .setBold(true)
    .setRanges([sheet.getRange("I4:I")])
    .build();

  // 3. Highlight Status: Akhwat -> Latar Mawar Lembut
  var ruleAkhwat = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Akhwat")
    .setBackground("#fce7f3")
    .setFontColor("#be185d")
    .setBold(true)
    .setRanges([sheet.getRange("I4:I")])
    .build();

  // 4. Highlight Status: Janda / Duda -> Latar Warm Amber
  var ruleDudaJanda = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=OR(I4="Duda"; I4="Janda")')
    .setBackground("#fef3c7")
    .setFontColor("#b45309")
    .setBold(true)
    .setRanges([sheet.getRange("I4:I")])
    .build();

  // 5. Highlight Mode Hadir Offline Masjid -> Latar Zamrud Lembut
  var ruleOffline = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("Offline")
    .setBackground("#ecfdf5")
    .setFontColor("#047857")
    .setRanges([sheet.getRange("T4:T")])
    .build();

  // 6. Highlight Mode Hadir Online Zoom -> Latar Indigo Lembut
  var ruleOnline = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("Online")
    .setBackground("#e0e7ff")
    .setFontColor("#3730a3")
    .setRanges([sheet.getRange("T4:T")])
    .build();

  rules.push(ruleLunas, ruleBertahap, ruleIkhwan, ruleAkhwat, ruleDudaJanda, ruleOffline, ruleOnline);
  sheet.setConditionalFormatRules(rules);
}

// =============================================================================
// 5. PEMBUATAN & STYLING TAB "📊 DASHBOARD & REKAP"
// =============================================================================
function buatTabDashboard(docInstance) {
  var doc = docInstance || SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "📊 DASHBOARD & REKAP";
  var sheet = doc.getSheetByName(sheetName);

  if (!sheet) {
    sheet = doc.insertSheet(sheetName, 0); // Buat di posisi paling pertama (tab paling kiri)
  }

  sheet.clear();
  sheet.setHiddenGridlines(false);

  // Set lebar kolom dashboard
  sheet.setColumnWidth(1, 25);   // A (Margin)
  sheet.setColumnWidth(2, 140);  // B
  sheet.setColumnWidth(3, 130);  // C
  sheet.setColumnWidth(4, 140);  // D
  sheet.setColumnWidth(5, 130);  // E
  sheet.setColumnWidth(6, 140);  // F
  sheet.setColumnWidth(7, 130);  // G
  sheet.setColumnWidth(8, 140);  // H
  sheet.setColumnWidth(9, 140);  // I
  sheet.setColumnWidth(10, 25);  // J (Margin)

  // -------------------------------------------------------------
  // HEADER BANNER UTAMA DASHBOARD
  // -------------------------------------------------------------
  sheet.getRange("B2:I2").merge()
    .setValue("⛵ DEEN IN LOVE SERIES: BELAJAR SEBELUM BERLAYAR")
    .setFontFamily("Arial")
    .setFontSize(16)
    .setFontWeight("bold")
    .setFontColor("#2dd4bf")
    .setBackground("#042230")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(2, 38);

  sheet.getRange("B3:I3").merge()
    .setValue("DASHBOARD EKSEKUTIF: MONITORING REGISTRASI, DATABASE PESERTA & KEUANGAN KELAS PRANIKAH — UM OFFICIAL")
    .setFontFamily("Arial")
    .setFontSize(9)
    .setFontWeight("bold")
    .setFontColor("#cbd5e1")
    .setBackground("#062e3d")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(3, 24);

  // -------------------------------------------------------------
  // KARTU METRIK KPI UTAMA (ROW 5 - 7)
  // -------------------------------------------------------------
  // Kartu 1: Total Peserta (B5:C7)
  buatKartuKpi(sheet, "B5:C7", "👥 TOTAL PESERTA TERDAFTAR", "=COUNTA('👥 Data Peserta'!H4:H)", "Peserta Terdaftar", "#f0fdf4", "#15803d", "0");
  
  // Kartu 2: Total Dana Registrasi Masuk (D5:E7)
  buatKartuKpi(sheet, "D5:E7", "💰 TOTAL KAS DANA MASUK", "=SUM('👥 Data Peserta'!F4:F)", "Pembayaran Registrasi", "#ecfdf5", "#047857", '"Rp"#,##0');

  // Kartu 3: Total Peserta Ikhwan (F5:G7)
  buatKartuKpi(sheet, "F5:G7", "🥾 TOTAL IKHWAN", "=COUNTIF('👥 Data Peserta'!J4:J, \"*Ikhwan*\")", "Laki-laki", "#f0f9ff", "#0284c7", "0");

  // Kartu 4: Total Peserta Akhwat (H5:I7)
  buatKartuKpi(sheet, "H5:I7", "🌸 TOTAL AKHWAT", "=COUNTIF('👥 Data Peserta'!J4:J, \"*Akhwat*\")", "Perempuan", "#fff1f2", "#be185d", "0");

  // -------------------------------------------------------------
  // KARTU STATUS & MODE KEHADIRAN (ROW 9 - 11)
  // -------------------------------------------------------------
  // Kartu 5: Status Single
  buatKartuKpi(sheet, "B9:C11", "💍 STATUS: SINGLE (BELUM MENIKAH)", "=COUNTIF('👥 Data Peserta'!I4:I, \"Ikhwan\") + COUNTIF('👥 Data Peserta'!I4:I, \"Akhwat\")", "Peserta Single", "#f0fdf4", "#16a34a", "0");

  // Kartu 6: Status Duda & Janda
  buatKartuKpi(sheet, "D9:E11", "🕊️ STATUS: DUDA & JANDA", "=COUNTIF('👥 Data Peserta'!I4:I, \"Duda\") + COUNTIF('👥 Data Peserta'!I4:I, \"Janda\")", "Pernah Menikah", "#fffbeb", "#b45309", "0");

  // Kartu 7: Hadir Offline Masjid
  buatKartuKpi(sheet, "F9:G11", "🕌 MODE: OFFLINE (MASJID)", "=COUNTIF('👥 Data Peserta'!T4:T, \"*Offline*\")", "Masjid Widya Cendikia", "#f0fdf4", "#047857", "0");

  // Kartu 8: Hadir Online Zoom / Hybrid
  buatKartuKpi(sheet, "H9:I11", "💻 MODE: ONLINE ZOOM / HYBRID", "=COUNTIF('👥 Data Peserta'!T4:T, \"*Online*\") + COUNTIF('👥 Data Peserta'!T4:T, \"*Hybrid*\")", "Zoom Interaktif", "#f5f3ff", "#6366f1", "0");

  // -------------------------------------------------------------
  // TABEL REKAPITULASI (ROW 13+)
  // -------------------------------------------------------------
  // Judul Tabel Kiri: Rekap Kategori Paket
  sheet.getRange("B13:E13").merge()
    .setValue("🏷️ REKAPITULASI KATEGORI PAKET KEPESERTAAN")
    .setFontFamily("Arial").setFontSize(10).setFontWeight("bold").setFontColor("#ffffff").setBackground("#0a3d52")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(13, 28);

  var subHeadersPkg = ["Kategori Paket", "Tarif (Rp)", "Peserta", "Total Dana Masuk"];
  sheet.getRange("B14:E14").setValues([subHeadersPkg])
    .setFontFamily("Arial").setFontSize(9).setFontWeight("bold").setFontColor("#042230").setBackground("#ccfbf1")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(14, 25);

  var pkgRows = [
    ["Ikhwan (1 Orang)", 500000, "=COUNTIF('👥 Data Peserta'!E4:E, \"*Ikhwan*\")", "=SUMIF('👥 Data Peserta'!E4:E, \"*Ikhwan*\", '👥 Data Peserta'!F4:F)"],
    ["Akhwat (1 Orang)", 500000, "=COUNTIF('👥 Data Peserta'!E4:E, \"*Akhwat*\")", "=SUMIF('👥 Data Peserta'!E4:E, \"*Akhwat*\", '👥 Data Peserta'!F4:F)"],
    ["Total Keseluruhan", "-", "=SUM(D15:D16)", "=SUM(E15:E16)"]
  ];
  sheet.getRange("B15:E17").setValues(pkgRows)
    .setFontFamily("Arial").setFontSize(9).setVerticalAlignment("middle");
  sheet.getRange("B15:B17").setHorizontalAlignment("left");
  sheet.getRange("C15:C16").setHorizontalAlignment("right").setNumberFormat('"Rp"#,##0');
  sheet.getRange("C17").setHorizontalAlignment("center");
  sheet.getRange("D15:D17").setHorizontalAlignment("center");
  sheet.getRange("E15:E17").setHorizontalAlignment("right").setNumberFormat('"Rp"#,##0');
  sheet.getRange("B17:E17").setFontWeight("bold").setBackground("#f1f5f9");
  sheet.getRange("B13:E17").setBorder(true, true, true, true, true, true, "#cbd5e1", SpreadsheetApp.BorderStyle.SOLID);

  // Judul Tabel Kanan: Rekap Status Kepesertaan
  sheet.getRange("G13:I13").merge()
    .setValue("📋 REKAPITULASI STATUS KEPESERTAAN")
    .setFontFamily("Arial").setFontSize(10).setFontWeight("bold").setFontColor("#ffffff").setBackground("#0a3d52")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  var subHeadersStatus = ["Status Kepesertaan", "Jumlah", "Persentase"];
  sheet.getRange("G14:I14").setValues([subHeadersStatus])
    .setFontFamily("Arial").setFontSize(9).setFontWeight("bold").setFontColor("#042230").setBackground("#ccfbf1")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  var statusRows = [
    ["Ikhwan", "=COUNTIF('👥 Data Peserta'!I4:I, \"Ikhwan\")", "=IF(D17>0; H15/D17; 0)"],
    ["Akhwat", "=COUNTIF('👥 Data Peserta'!I4:I, \"Akhwat\")", "=IF(D17>0; H16/D17; 0)"],
    ["Janda", "=COUNTIF('👥 Data Peserta'!I4:I, \"Janda\")", "=IF(D17>0; H17/D17; 0)"],
    ["Duda", "=COUNTIF('👥 Data Peserta'!I4:I, \"Duda\")", "=IF(D17>0; H18/D17; 0)"],
    ["Total Peserta", "=SUM(H15:H18)", "=SUM(I15:I18)"]
  ];
  sheet.getRange("G15:I19").setValues(statusRows)
    .setFontFamily("Arial").setFontSize(9).setVerticalAlignment("middle");
  sheet.getRange("G15:G19").setHorizontalAlignment("left");
  sheet.getRange("H15:H19").setHorizontalAlignment("center");
  sheet.getRange("I15:I19").setHorizontalAlignment("right").setNumberFormat("0.0%");
  sheet.getRange("G19:I19").setFontWeight("bold").setBackground("#f1f5f9");
  sheet.getRange("G13:I19").setBorder(true, true, true, true, true, true, "#cbd5e1", SpreadsheetApp.BorderStyle.SOLID);

  // -------------------------------------------------------------
  // TABEL 3: REKAP MODE KEHADIRAN (ROW 21+)
  // -------------------------------------------------------------
  sheet.getRange("B20:E20").merge()
    .setValue("🕌 REKAPITULASI MODE KEHADIRAN (KELAS HYBRID)")
    .setFontFamily("Arial").setFontSize(10).setFontWeight("bold").setFontColor("#ffffff").setBackground("#0a3d52")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(20, 28);

  var subHeadersMode = ["Format Kehadiran", "Jumlah Peserta", "Porsi", "Keterangan Lokasi"];
  sheet.getRange("B21:E21").setValues([subHeadersMode])
    .setFontFamily("Arial").setFontSize(9).setFontWeight("bold").setFontColor("#042230").setBackground("#ccfbf1")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(21, 25);

  var modeRows = [
    ["Offline (Masjid Tholibul Ilmi)", "=COUNTIF('👥 Data Peserta'!T4:T, \"*Offline*\")", "=IF(D17>0; C22/D17; 0)", "Widya Cendikia (09.00 WIB)"],
    ["Online (Zoom Meeting)", "=COUNTIF('👥 Data Peserta'!T4:T, \"*Online*\")", "=IF(D17>0; C23/D17; 0)", "Link Zoom Interaktif"],
    ["Hybrid Fleksibel", "=COUNTIF('👥 Data Peserta'!T4:T, \"*Hybrid*\")", "=IF(D17>0; C24/D17; 0)", "Kombinasi Offline & Online"],
    ["Total Peserta", "=SUM(C22:C24)", "=SUM(D22:D24)", "Semua Terakomodasi"]
  ];
  sheet.getRange("B22:E25").setValues(modeRows)
    .setFontFamily("Arial").setFontSize(9).setVerticalAlignment("middle");
  sheet.getRange("B22:B25").setHorizontalAlignment("left");
  sheet.getRange("C22:C25").setHorizontalAlignment("center");
  sheet.getRange("D22:D25").setHorizontalAlignment("right").setNumberFormat("0.0%");
  sheet.getRange("E22:E25").setHorizontalAlignment("left");
  sheet.getRange("B25:E25").setFontWeight("bold").setBackground("#f1f5f9");
  sheet.getRange("B20:E25").setBorder(true, true, true, true, true, true, "#cbd5e1", SpreadsheetApp.BorderStyle.SOLID);

  // -------------------------------------------------------------
  // TABEL 4: REKAP SKEMA PEMBAYARAN (ROW 20-25)
  // -------------------------------------------------------------
  sheet.getRange("G20:I20").merge()
    .setValue("💳 REKAP SKEMA PEMBAYARAN")
    .setFontFamily("Arial").setFontSize(10).setFontWeight("bold").setFontColor("#ffffff").setBackground("#0a3d52")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  var subHeadersBayar = ["Skema Pembayaran", "Peserta", "Porsi"];
  sheet.getRange("G21:I21").setValues([subHeadersBayar])
    .setFontFamily("Arial").setFontSize(9).setFontWeight("bold").setFontColor("#042230").setBackground("#ccfbf1")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  var bayarRows = [
    ["Lunas (100% - Rp 500rb)", "=COUNTIF('👥 Data Peserta'!G4:G, \"*LUNAS*\")", "=IF(D17>0; H22/D17; 0)"],
    ["Bertahap (3x Bayar)", "=COUNTIF('👥 Data Peserta'!G4:G, \"*BERTAHAP*\")", "=IF(D17>0; H23/D17; 0)"],
    ["-", "-", "-"],
    ["Total Peserta", "=SUM(H22:H23)", "=SUM(I22:I23)"]
  ];
  sheet.getRange("G22:I25").setValues(bayarRows)
    .setFontFamily("Arial").setFontSize(9).setVerticalAlignment("middle");
  sheet.getRange("G22:G25").setHorizontalAlignment("left");
  sheet.getRange("H22:H25").setHorizontalAlignment("center");
  sheet.getRange("I22:I25").setHorizontalAlignment("right").setNumberFormat("0.0%");
  sheet.getRange("G24:I24").setFontColor("#94a3b8");
  sheet.getRange("G25:I25").setFontWeight("bold").setBackground("#f1f5f9");
  sheet.getRange("G20:I25").setBorder(true, true, true, true, true, true, "#cbd5e1", SpreadsheetApp.BorderStyle.SOLID);

  // -------------------------------------------------------------
  // FOOTER PANDUAN NAVIGASI (ROW 27)
  // -------------------------------------------------------------
  sheet.getRange("B27:I28").merge()
    .setValue("📋 LIHAT DATA RINCI PESERTA: Buka tab '👥 Data Peserta' di bawah untuk mengecek data nomor WhatsApp, usia, pendidikan, pekerjaan, dan file bukti transfer.\n" +
              "🕌 LEMBAR PRESENSI 6 PEKAN: Buka tab '🕌 Presensi 6 Pertemuan' untuk mencatat kehadiran tiap pekan, pembagian buku 'Pulih Bersama Allah', dan sertifikat resmi.")
    .setFontFamily("Arial").setFontSize(8.5).setFontColor("#334155").setBackground("#f0fdf4")
    .setHorizontalAlignment("center").setVerticalAlignment("middle").setWrap(true);
  sheet.getRange("B27:I28").setBorder(true, true, true, true, false, false, "#0d9488", SpreadsheetApp.BorderStyle.DASHED);
}

// Helper untuk membuat kartu metrik KPI
function buatKartuKpi(sheet, a1Notation, title, formula, subtitle, bgColor, accentColor, numFormat) {
  var range = sheet.getRange(a1Notation);
  var coords = range.getSheet().getRange(a1Notation);
  var startR = coords.getRow();
  var startC = coords.getColumn();
  var numCols = coords.getNumColumns();

  // Row 1: Title
  sheet.getRange(startR, startC, 1, numCols).merge()
    .setValue(title)
    .setFontFamily("Arial").setFontSize(8.5).setFontWeight("bold").setFontColor(accentColor)
    .setBackground(bgColor).setHorizontalAlignment("center").setVerticalAlignment("middle");

  // Row 2: Value Formula
  sheet.getRange(startR + 1, startC, 1, numCols).merge()
    .setValue(formula)
    .setFontFamily("Arial").setFontSize(18).setFontWeight("bold").setFontColor("#042230")
    .setBackground(bgColor).setHorizontalAlignment("center").setVerticalAlignment("middle")
    .setNumberFormat(numFormat);

  // Row 3: Subtitle
  sheet.getRange(startR + 2, startC, 1, numCols).merge()
    .setValue(subtitle)
    .setFontFamily("Arial").setFontSize(7.5).setFontColor("#64748b")
    .setBackground(bgColor).setHorizontalAlignment("center").setVerticalAlignment("middle");

  // Set card border
  range.setBorder(true, true, true, true, false, false, accentColor, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
}

// =============================================================================
// 6. PEMBUATAN & STYLING TAB "🕌 PRESENSI 6 PERTEMUAN"
// =============================================================================
function buatTabPresensi(docInstance) {
  var doc = docInstance || SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "🕌 Presensi 6 Pertemuan";
  var sheet = doc.getSheetByName(sheetName);

  if (!sheet) {
    sheet = doc.insertSheet(sheetName);
  }

  sheet.clear();

  // Banner Header
  sheet.getRange("A1:P1").merge()
    .setValue("🕌 DEEN IN LOVE SERIES: BELAJAR SEBELUM BERLAYAR — LEMBAR PRESENSI 6 PERTEMUAN HYBRID")
    .setFontFamily("Arial").setFontSize(12).setFontWeight("bold").setFontColor("#2dd4bf").setBackground("#042230")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);

  sheet.getRange("A2:P2").merge()
    .setValue("Kurikulum Pranikah Bersama Ustadz Mahruroji (Masjid Tholibul Ilmi Widya Cendikia & Zoom Meeting). Klik checkbox (centang) untuk menandai kehadiran peserta di setiap sesi.")
    .setFontFamily("Arial").setFontSize(8.5).setFontColor("#cbd5e1").setBackground("#062e3d")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(2, 24);

  // Header Kolom
  var headers = [
    "No",
    "Kode Registrasi",
    "Nama Peserta",
    "Status",
    "Mode Terdaftar",
    "No. WhatsApp",
    "P1: Kesiapan Diri (6 Des)",
    "P2: Memilih Pasangan (13 Des)",
    "P3: Fondasi Rumah Tangga (20 Des)",
    "P4: Pasangan Surga (27 Des)",
    "P5: Kelola Rumah Tangga (3 Jan)",
    "P6: Kelola Konflik (10 Jan)",
    "Rihlah & Makan (17 Jan)",
    "Buku Pulih Bersama Allah",
    "Sertifikat Resmi",
    "Link WhatsApp"
  ];

  sheet.getRange(3, 1, 1, headers.length).setValues([headers])
    .setFontFamily("Arial").setFontSize(9).setFontWeight("bold").setFontColor("#ffffff").setBackground("#0a3d52")
    .setHorizontalAlignment("center").setVerticalAlignment("middle").setWrap(true);
  sheet.setRowHeight(3, 40);

  // Lebar kolom
  var widths = [45, 120, 180, 90, 150, 130, 95, 95, 95, 95, 95, 95, 110, 110, 100, 120];
  for (var w = 0; w < widths.length; w++) {
    sheet.setColumnWidth(w + 1, widths[w]);
  }

  // Formula Otomatis mengambil data peserta dari sheet "👥 Data Peserta"
  var filterFormula = '=IFERROR(FILTER({\'👥 Data Peserta\'!B4:B, \'👥 Data Peserta\'!H4:H, \'👥 Data Peserta\'!I4:I, \'👥 Data Peserta\'!T4:T, \'👥 Data Peserta\'!N4:N}, \'👥 Data Peserta\'!B4:B<>""), "Belum ada peserta terdaftar.")';

  sheet.getRange("B4").setValue(filterFormula);
  sheet.getRange("A4:A60").setFormula('=IF(B4<>""; IF(B4="Belum ada peserta terdaftar."; ""; ROW()-3); "")');

  sheet.getRange("A4:P60").setFontFamily("Arial").setFontSize(9).setVerticalAlignment("middle");
  sheet.getRange("A4:B60").setHorizontalAlignment("center");
  sheet.getRange("D4:F60").setHorizontalAlignment("center");

  // Pasang Data Validation Checkbox untuk Kolom G sampai O (Presensi & Fasilitas)
  var checkboxValidation = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  sheet.getRange("G4:O60").setDataValidation(checkboxValidation);

  // Formula Kolom WhatsApp Link
  sheet.getRange("P4:P60").setFormula(
    '=IF(AND(F4<>""; F4<>"-"); HYPERLINK("https://wa.me/" & SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(F4; " "; ""); "-"; ""); "+"; ""); "\'"; ""); "💬 Chat WA"); "")'
  );
  sheet.getRange("P4:P60").setFontColor("#0284c7").setFontWeight("bold").setHorizontalAlignment("center");

  // Border & Freeze
  sheet.getRange("A3:P60").setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID);
  sheet.setFrozenRows(3);
  sheet.setFrozenColumns(3);
}

// =============================================================================
// 7. DATA SIMULASI / CONTOH UNTUK TESTING TAMPILAN
// =============================================================================
function isiDataSimulasi() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("👥 Data Peserta");

  if (!sheet || sheet.getLastRow() < 3) {
    setupSpreadsheetLengkap(doc);
    sheet = doc.getSheetByName("👥 Data Peserta");
  }

  // Siapkan 4 data simulasi yang mencakup Ikhwan, Akhwat, Janda, dan Duda
  var sampleRows = [
    // Peserta 1: Ikhwan (Single) - Hadir Offline
    [
      1, "DIL-2026-101", new Date(), "Deen In Love Series", "Ikhwan (500K - 1 Orang)", 500000, "LUNAS",
      "Muhammad Rizky Pratama, S.T.", "Ikhwan", "Laki-laki (Ikhwan)", 27, "S1 Teknik Informatika", "Software Engineer",
      "'+6281288881234", "rizky.pratama@gmail.com", "Kebayoran Baru, Jakarta Selatan",
      "Single (Sedang Aktif Mencari Calon Pasangan)", "Pernah Ikut Kajian Pranikah Dasar", "Kriteria Memilih Pasangan & Syariat Ta'aruf",
      "Offline — Masjid Tholibul Ilmi Widya Cendikia", "bukti-transfer-rizky.jpg", ""
    ],
    // Peserta 2: Akhwat (Single) - Hadir Online Zoom
    [
      2, "DIL-2026-102", new Date(), "Deen In Love Series", "Akhwat (500K - 1 Orang)", 500000, "LUNAS",
      "Fathimah Azzahra, S.Farm.", "Akhwat", "Perempuan (Akhwat)", 25, "S1 Farmasi", "Apoteker Klinis",
      "'+6285711223344", "fathimah.azzahra@gmail.com", "Bintaro Sektor 9, Tangerang Selatan",
      "Single (Mempersiapkan Ilmu Sebelum Menikah)", "Belum Pernah Ikut Kelas Intensif", "Manajemen Konflik & Hak Kewajiban Pasangan",
      "Online — Zoom Meeting Interaktif", "struk-bca-fathimah.png", ""
    ],
    // Peserta 3: Duda - Hadir Hybrid Fleksibel (Pembayaran Bertahap 3x Bayar)
    [
      3, "DIL-2026-103", new Date(), "Deen In Love Series", "Ikhwan (500K - 1 Orang)", 200000, "BERTAHAP (Tahap 1 • Sisa 2x)",
      "dr. Abdullah Rasyid", "Duda", "Laki-laki (Ikhwan)", 34, "Profesi Dokter Umum", "Dokter RSUD",
      "'+6281377889900", "dr.abdullah.rasyid@gmail.com", "Serang, Banten",
      "Siap Menikah Kembali (Menyempurnakan Agama)", "Pernah Mempelajari Fiqih Munakahat", "Membangun Fondasi Keluarga Baru & Parenting",
      "Hybrid Fleksibel — Offline & Online", "transfer-bsi-tahap1-abdullah.pdf", ""
    ],
    // Peserta 4: Janda - Hadir Offline
    [
      4, "DIL-2026-104", new Date(), "Deen In Love Series", "Akhwat (500K - 1 Orang)", 500000, "LUNAS",
      "Khadijah Nurul Hidayah, M.Pd.", "Janda", "Perempuan (Akhwat)", 31, "S2 Manajemen Pendidikan", "Dosen & Konsultan",
      "'+6281299887766", "khadijah.nurul@campus.ac.id", "Depok, Jawa Barat",
      "Mempersiapkan Diri Sebelum Menikah Kembali", "Rutin Mengikuti Majelis Taklim", "Menjadi Pasangan Hingga ke Surga & Pulih Bersama Allah",
      "Offline — Masjid Tholibul Ilmi Widya Cendikia", "bukti-mandiri-khadijah.jpg", ""
    ]
  ];

  var startRow = sheet.getLastRow() + 1;
  sheet.getRange(startRow, 1, sampleRows.length, sampleRows[0].length).setValues(sampleRows);
  formatDataRows(sheet, startRow, sampleRows.length);

  // Perbarui juga tab presensi & dashboard
  buatTabDashboard(doc);
  buatTabPresensi(doc);

  SpreadsheetApp.getActiveSpreadsheet().toast(
    "4 Data peserta simulasi (Ikhwan, Akhwat, Duda, Janda) berhasil dimasukkan! Silakan cek tab Dashboard, Data Peserta & Presensi.",
    "🧪 Simulasi Sukses",
    4
  );
}

// Helper ekstraksi angka dari format Rupiah
function parseNominal(val) {
  if (typeof val === "number") return val;
  if (!val) return 0;
  var digits = val.toString().replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

// Helper format nomor telepon di spreadsheet
function formatPhoneSpreadsheet(val) {
  if (!val) return "-";
  var s = val.toString().trim();
  if (s.indexOf("+") === 0) return "'" + s;
  if (s.indexOf("62") === 0) return "'+62" + s.substring(2);
  if (s.indexOf("08") === 0) return "'+62" + s.substring(1);
  return "'" + s;
}
