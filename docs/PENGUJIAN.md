# Pengujian Black Box Sistem Peminjaman iPhone

## 1. Register

- Tujuan: Memastikan endpoint `/api/auth/register` dapat membuat akun baru.
- Langkah:
  1. Kirim `POST /api/auth/register` dengan nama, email, dan password.
  2. Verifikasi respons status 201.
  3. Verifikasi respon berisi `message` dan `data` user.
- Kasus negatif:
  - Register dengan email yang sudah terdaftar menghasilkan error.
  - Register tanpa password menghasilkan error validasi.

## 2. Login

- Tujuan: Memastikan endpoint `/api/auth/login` memberikan token JWT.
- Langkah:
  1. Login dengan email dan password yang valid.
  2. Verifikasi respons status 200.
  3. Verifikasi response berisi `token`.
- Kasus negatif:
  - Email atau password salah menghasilkan error 401.

## 3. JWT Authentication

- Tujuan: Memastikan semua endpoint dilindungi.
- Langkah:
  1. Akses endpoint terproteksi tanpa header Authorization.
  2. Verifikasi respons error 401.
  3. Akses endpoint dengan token valid dan verifikasi akses berhasil.

## 4. CRUD iPhone

- Tujuan: Memastikan admin dapat menambah, mengubah, membaca, dan menghapus iPhone.
- Langkah:
  1. Ambil daftar iPhone dengan `GET /api/iphones`.
  2. Tambahkan iPhone baru menggunakan `POST /api/iphones` sebagai admin.
  3. Ubah data iPhone dengan `PUT /api/iphones/:id`.
  4. Hapus data iPhone dengan `DELETE /api/iphones/:id`.
- Kasus negatif:
  - Non-admin tidak dapat menambah, mengubah, atau menghapus.
  - `stok` yang tidak valid memberikan error.

## 5. CRUD Peminjam

- Tujuan: Memastikan pengelolaan data peminjam berjalan.
- Langkah:
  1. Ambil data peminjam dengan `GET /api/peminjam`.
  2. Tambah peminjam baru menggunakan `POST /api/peminjam`.
  3. Ubah data peminjam dengan `PUT /api/peminjam/:id`.
  4. Hapus data peminjam dengan `DELETE /api/peminjam/:id`.
- Kasus negatif:
  - Email tidak valid menolak pembuatan peminjam.

## 6. CRUD Peminjaman

- Tujuan: Memastikan peminjaman tercatat dengan benar.
- Langkah:
  1. Ambil daftar peminjaman dengan `GET /api/peminjaman`.
  2. Buat peminjaman baru dengan `POST /api/peminjaman`.
  3. Ubah metadata peminjaman dengan `PUT /api/peminjaman/:id`.
  4. Hapus peminjaman dengan `DELETE /api/peminjaman/:id`.
- Kasus negatif:
  - Peminjaman tidak berhasil jika stok iPhone kosong.
  - Peminjaman dengan peminjam atau iPhone tidak ditemukan menghasilkan error.

## 7. Pengembalian iPhone

- Tujuan: Memastikan stok bertambah kembali dan status berubah.
- Langkah:
  1. Panggil `PUT /api/peminjaman/:id/pengembalian`.
  2. Verifikasi `status` peminjaman menjadi `Dikembalikan`.
  3. Verifikasi jumlah stok iPhone bertambah.
- Kasus negatif:
  - Pengembalian ganda menghasilkan error.

## 8. Dashboard

- Tujuan: Memastikan endpoint dashboard menampilkan ringkasan yang benar.
- Langkah:
  1. Akses `GET /api/dashboard`.
  2. Verifikasi respons berisi `totalIphone`, `iphoneTersedia`, `iphoneDipinjam`, `totalPeminjam`, `totalPeminjaman`, dan `peminjamanTerbaru`.
