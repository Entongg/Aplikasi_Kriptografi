# 🔐 Aplikasi Kriptografi PSDKU - Kelompok 1

Selamat datang di **Aplikasi Kriptografi Berbasis Web** buatan Kelompok 1 PSDKU Informatika! 🚀

Aplikasi ini adalah perangkat lunak ringan berbasis peramban (browser) yang memungkinkan Anda untuk melakukan proses **Enkripsi** dan **Dekripsi** pada pesan teks maupun file sembarang menggunakan berbagai macam algoritma kriptografi klasik dan modern. Aplikasi ini dibalut dengan antarmuka *Dark Glassmorphism* dan *Neon* yang interaktif.

---

## ✨ Fitur Utama

- 📝 **Pemrosesan Teks:** Enkripsi dan dekripsi pesan teks secara instan.
- 📁 **Pemrosesan File:** Mendukung enkripsi/dekripsi untuk semua jenis file (Gambar, Dokumen, Video, dll) tanpa merusak strukturnya.
- 🎨 **Antarmuka Modern:** Desain UI *Dark Aurora* dengan efek *Glassmorphism* yang memanjakan mata.
- 🔠 **Format Output Fleksibel:** Menampilkan hasil teks tanpa spasi atau dalam kelompok 5-huruf.
- 💾 **Ekspor Mudah:** Simpan hasil enkripsi/dekripsi teks langsung ke dalam file `.txt`.

### 🧮 Algoritma yang Tersedia:
1. **The Shift Cipher (Caesar)**
2. **The Substitution Cipher**
3. **The Affine Cipher**
4. **The Vigenere Cipher**
5. **The Hill Cipher**
6. **The Permutation Cipher**
7. **One-Time Pad (OTP)**

---

## 🛠️ Cara Menjalankan Program

Aplikasi ini tidak memerlukan instalasi *server-side* seperti Node.js atau PHP. Anda hanya memerlukan web browser!

### Langkah-langkah:
1. **Unduh atau Clone** seluruh file proyek ini ke dalam komputer Anda.
2. Pastikan file tersusun dengan benar, terutama jika menggunakan struktur folder asli (pastikan `index.html` dapat mengakses `style.css` dan `script.js`).
3. **Klik kanan** pada file `index.html`.
4. Pilih **"Open with"** (Buka dengan) lalu pilih browser favorit Anda (Chrome, Firefox, Edge, Safari, dll).
5. 🎉 Aplikasi siap digunakan! Pastikan Anda terhubung ke internet saat pertama kali membuka aplikasi agar pustaka matematika (*Math.js*) dan *font* modern dari Google dapat dimuat dengan baik.

---

## 📖 Panduan Penggunaan

### 1. Mengenkripsi / Mendekripsi Teks 🔤
- Pada bagian **Sumber Pesan**, pilih **"Teks Papan Ketik"**.
- Ketikkan pesan (plainteks atau cipherteks) pada area teks yang disediakan.
- Pilih **Algoritma Kriptografi** yang ingin digunakan.
- Masukkan **Kunci** yang sesuai dengan format algoritma yang dipilih (misal: Shift butuh angka, Vigenere butuh huruf).
- Klik tombol **Enkripsi** atau **Dekripsi**.
- Hasilnya akan muncul di kotak bawah. Anda juga bisa mengatur format tampilan atau menyimpannya sebagai file.

### 2. Mengenkripsi / Mendekripsi File 📁
- Pada bagian **Sumber Pesan**, pilih **"Unggah File"**.
- Klik area unggah dan pilih file apapun yang ada di perangkat Anda.
- Pilih **Algoritma Kriptografi**.
- Masukkan **Kunci**.
- Klik tombol **Enkripsi** atau **Dekripsi**.
- File hasil (baik berupa file `.dat` untuk cipherteks atau file dengan ekstensi asli untuk plainteks) akan **terunduh secara otomatis**.

### 3. Khusus Penggunaan Algoritma One-Time Pad (OTP) 🔑
Jika Anda memilih algoritma **One-Time Pad**, kolom input kunci teks akan disembunyikan. Sebagai gantinya:
- Anda diwajibkan untuk mengunggah file kunci berekstensi `.txt`.
- Pastikan file kunci `.txt` tersebut berisi karakter acak yang panjangnya **minimal sama atau lebih panjang** dari jumlah karakter pesan yang ingin diproses.

---

## ⚠️ Catatan Kunci (Key Requirements)
Setiap algoritma memiliki aturan kunci yang berbeda:
* **Shift:** Berupa 1 angka (contoh: `3`).
* **Substitution:** Tepat 26 huruf alfabet acak dan unik (contoh: `QWERTYUIOPASDFGHJKLZXCVBNM`).
* **Affine:** Berformat `a,b` dimana `a` harus relatif prima dengan 26 (contoh: `5,8`).
* **Vigenere & OTP:** Berupa huruf alfabet tanpa angka/simbol.
* **Hill:** Berupa kata dengan panjang kuadrat sempurna (contoh: `GYBNQKURP` -> 9 huruf, untuk matriks 3x3).
* **Permutation:** Berupa urutan angka posisi (contoh: `43215`).

---

## 👨‍💻 Pengembang
Dikembangkan sebagai tugas Kriptosistem oleh:
**Kelompok 1 **
