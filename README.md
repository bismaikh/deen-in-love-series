# Deen In Love Series: "Belajar Sebelum Berlayar" — UM Official ⛵

Portal Registrasi Resmi **Deen In Love Series: "Belajar Sebelum Berlayar" (`Pre Marriage, Deen Prepared`)** bersama **Ustadz Mahruroji**, diselenggarakan oleh **UM Official** (`s.id/deeninloveseries`).

Formulir pendaftaran interaktif bertema *Deep Ocean Midnight Teal & Luminous Cyan* yang disesuaikan langsung dengan desain visual poster resmi (`1.png`, `2.png`, `3.png`). Dilengkapi integrasi otomatis ke **Google Sheets** via Google Apps Script (Dashboard KPI, Database Peserta & Lembar Presensi 6 Pertemuan), validasi nomor WhatsApp internasional (`+62` permanen), bukti transfer pembayaran, serta undangan grup WhatsApp otomatis.

---

## 🌟 Informasi Program & Kurikulum (`1.png`, `2.png`, `3.png`)

- **Detail Pelaksanaan (`1.png`)**:
  - **Tagline**: `PRE MARRIAGE, DEEN PREPARED`
  - **Series**: `DEEN IN LOVE SERIES`
  - **Judul Utama**: *Belajar Sebelum Berlayar*
  - **Pemateri**: Bersama **Ustadz Mahruroji**
  - **Jadwal**: **Setiap Minggu, 6 Des – 17 Jan 2026**
  - **Waktu**: **Pukul 09.00 WIB**
  - **Link Resmi**: `s.id/deeninloveseries`

- **Format Kelas Hybrid (`2.png`)**:
  - 🕌 **Offline**: **Masjid Tholibul Ilmi Widya Cendikia**
  - 💻 **Online**: **Zoom Meeting**

- **Kurikulum Materi — 6 Pertemuan (`2.png`)**:
  1. **Pertemuan 1 (6 Des)**: *Sudahkah Aku Siap Menjadi Pasangan?*
  2. **Pertemuan 2 (13 Des)**: *Memilih Pasangan Yang Tepat*
  3. **Pertemuan 3 (20 Des)**: *Membangun Fondasi Rumah Tangga*
  4. **Pertemuan 4 (27 Des)**: *Menjadi Pasangan hingga ke Surga*
  5. **Pertemuan 5 (3 Jan)**: *Mengelola Kehidupan Rumah Tangga*
  6. **Pertemuan 6 (10 Jan)**: *Mengelola Perbedaan dan Konflik*
  - **Rihlah + Makan Bersama (17 Jan)**: Sesi kebersamaan, evaluasi belajar, dan rihlah santai.

- **Benefit & Fasilitas Lengkap (`3.png`)**:
  - **Pengalaman Berharga & Kesempatan Istimewa**:
    - Draft CV Nikah
    - Rihlah + Makan Bersama
    - **Kamar Hotel Aston 1 malam** *(khusus peserta pertama yang menikah setelah event)*
  - **Materi dan Sertifikasi**:
    - Rekaman Kelas
    - Materi PPT
    - Video Materi per Pekan
    - Sertifikat Resmi
  - **Fasilitas Kelas**:
    - Lanyard Eksklusif
    - Notebook
  - **Special Gift**:
    - 📘 **Buku "Pulih Bersama Allah"** *(Karya Ustadz Mahruroji)*

---

## 💳 Kategori Kepesertaan & Bukti Pembayaran

- **Pilihan Paket Kepesertaan (Hanya 2 Kategori)**:
  - **Ikhwan**: Rp 500.000 / 1 orang
  - **Akhwat**: Rp 500.000 / 1 orang
- **Formulir Pendaftaran Praktis & Terfokus**:
  - Pendaftaran perorangan (1 peserta per transaksi) dengan pemisahan kolom **Usia (Tahun)** dan **Pendidikan Terakhir**.
  - **Pilihan Status Kepesertaan**:
    - **Ikhwan**
    - **Akhwat**
    - **Janda**
    - **Duda**
  - **Pilihan Skema Pembayaran**:
    - **Lunas (1x Bayar)**: Bayar penuh Rp 500.000 saat pendaftaran. Slot peserta langsung tuntas terkonfirmasi 100%.
    - **Bertahap (3x Bayar)**: Cicilan fleksibel total Rp 500.000:
      - **Tahap 1 (Saat Pendaftaran)**: Rp 200.000 untuk mengunci kuota slot.
      - **Tahap 2 (Sebelum Pertemuan 1)**: Rp 150.000 maksimal H-3 kelas perdana (3 Des 2026).
      - **Tahap 3 (Pelunasan Akhir)**: Rp 150.000 maksimal sebelum Pertemuan 4 (24 Des 2026).
  - **Seksi Bukti Transfer Pembayaran**: Terintegrasi langsung dengan drop-zone **Unggah Struk / Bukti Pembayaran** (mendukung JPG, PNG, PDF maks. 5 MB) sesuai skema pembayaran yang dipilih.
  - Bagian Kontak Wali / Keluarga Terdekat ditiadakan demi kecepatan pendaftaran.

---

## 📊 Desain & Fitur Google Spreadsheet (`google-apps-script.js`)

1. **Tab `📊 DASHBOARD & REKAP`**:
   - **Kartu Metrik KPI Eksekutif**:
     - Total Peserta Terdaftar
     - Total Kas Dana Masuk (Rp)
     - Total Peserta Ikhwan & Akhwat
     - Rekap Status Single vs Duda & Janda
     - Rekap Kehadiran Offline (Masjid Widya Cendikia) vs Online (Zoom Meeting)
   - **Tabel Rekapitulasi Otomatis**:
     - Rekapitulasi Kategori Paket Kepesertaan (`Ikhwan` vs `Akhwat` @ Rp 500.000).
     - Rekapitulasi Status Kepesertaan (`Ikhwan`, `Akhwat`, `Janda`, `Duda` dengan persentase porsi).
     - Rekapitulasi Mode Kehadiran Hybrid (`Offline`, `Online`, `Hybrid Fleksibel`).

2. **Tab `👥 Data Peserta` (Master Database)**:
   - Desain bertema *Deep Ocean Midnight Teal & Luminous Cyan* (`#042230` & `#2dd4bf`).
   - 22 Kolom Terstruktur:
     - No, Kode Registrasi, Waktu Pendaftaran, Program/Seri, Kategori Paket, Biaya Registrasi, Status Bayar.
     - Nama Lengkap, Status Kepesertaan (Ikhwan/Akhwat/Janda/Duda), Jenis Kelamin, Usia (Thn), Pendidikan Terakhir, Pekerjaan/Aktivitas.
     - No. WhatsApp, Email, Kota & Alamat Domisili.
     - Status Kesiapan Menikah, Pengalaman Kajian, Fokus Utama Belajar, Mode Kehadiran, Bukti Transfer.
     - **Link WhatsApp (1-Click Chat)**: Formula otomatis `HYPERLINK("https://wa.me/...")` untuk langsung menghubungi peserta.
   - Pewarnaan otomatis (Conditional Formatting) untuk LUNAS, Ikhwan, Akhwat, Janda/Duda, dan Hadir Offline/Online.

3. **Tab `🕌 Presensi 6 Pertemuan`**:
   - Lembar presensi mingguan untuk memantau kehadiran 6 pertemuan + Rihlah.
   - Dilengkapi checklist interaktif (Checkbox):
     - P1 (6 Des): Kesiapan Diri
     - P2 (13 Des): Memilih Pasangan
     - P3 (20 Des): Fondasi Keluarga
     - P4 (27 Des): Pasangan Surga
     - P5 (3 Jan): Kelola Rumah Tangga
     - P6 (10 Jan): Kelola Konflik
     - Rihlah & Makan Bersama (17 Jan)
     - Distribusi Buku "Pulih Bersama Allah" & Sertifikat Resmi.
   - Link WhatsApp langsung per peserta.

4. **Menu Khusus Google Sheets `⛵ Deen In Love`**:
   - Muncul otomatis di toolbar atas Google Sheets.
   - Opsi: `🎨 Desain Ulang & Percantik Spreadsheet`, `📊 Perbarui Rumus Dashboard Rekap`, `🕌 Perbarui Lembar Presensi 6 Pertemuan`, dan `🧪 Masukkan Data Contoh (Simulasi)`.

---

## 📁 Struktur Berkas

```
TSJ - Salin/
├── index.html                       # Portal utama registrasi Deen In Love Series
├── 1.png                            # Slide 1: Poster Utama "Belajar Sebelum Berlayar"
├── 2.png                            # Slide 2: Poster Silabus 6 Pertemuan & Kelas Hybrid
├── 3.png                            # Slide 3: Poster Benefit, Fasilitas & Buku Pulih Bersama Allah
├── qris.png                         # Kode QRIS resmi untuk pembayaran
├── google-apps-script.js            # Script integrasi otomatis, dashboard & presensi Google Sheets
└── README.md                        # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

1. **Lokal di Browser**:
   Buka berkas `index.html` langsung di browser Anda (Chrome, Edge, Safari, Firefox).
2. **Pemasangan Google Apps Script**:
   Buka [Google Sheets](https://sheets.new), klik menu **Extensions > Apps Script**, tempel seluruh kode dari `google-apps-script.js`, jalankan `setupSpreadsheetLengkap`, lalu deploy sebagai Web App.
   - **Web App URL Aktif**: `https://script.google.com/macros/s/AKfycbzvXQTvnjoksSrwN4D6FLN1rDREH-gaPzl1QPdzPzmTXPI_b8Dc6SylzhHt7O576HzfPg/exec`
