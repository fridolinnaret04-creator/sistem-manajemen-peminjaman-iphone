# Dokumentasi API Sistem Peminjaman iPhone

## Header Umum

- `Content-Type: application/json`
- `Authorization: Bearer <token>` untuk endpoint yang membutuhkan autentikasi

## Auth

### POST /api/auth/register

Request body:

```json
{
  "name": "Nama",
  "email": "user@mail.com",
  "password": "password123"
}
```

Response success:

```json
{
  "message": "Registrasi berhasil",
  "data": {
    "id": 1,
    "name": "Nama",
    "email": "user@mail.com",
    "role": "USER"
  }
}
```

Response error:

```json
{ "error": "Email sudah terdaftar" }
```

### POST /api/auth/login

Request body:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

Response success:

```json
{
  "message": "Login berhasil",
  "token": "<jwt-token>"
}
```

Response error:

```json
{ "error": "Email atau password salah" }
```

### POST /api/auth/logout

Header: `Authorization: Bearer <token>`
Response success:

```json
{ "message": "Logout berhasil" }
```

### GET /api/auth/profile

Header: `Authorization: Bearer <token>`
Response success:

```json
{
  "data": {
    "id": 1,
    "name": "Admin iPhone",
    "email": "admin@gmail.com",
    "role": "ADMIN",
    "createdAt": "2026-06-06T...",
    "updatedAt": "2026-06-06T..."
  }
}
```

## Modul iPhone

### GET /api/iphones

Header: `Authorization: Bearer <token>`
Response success:

```json
{ "data": [ { "id": 1, "nama_iphone": "iPhone 14", ... } ] }
```

### GET /api/iphones/:id

Header: `Authorization: Bearer <token>`
Response success:

```json
{ "data": { "id": 1, "nama_iphone": "iPhone 14", ... } }
```

### POST /api/iphones

Header: `Authorization: Bearer <admin-token>`
Request body:

```json
{
  "nama_iphone": "iPhone 15",
  "seri": "A3000",
  "warna": "Hitam",
  "kapasitas": "256GB",
  "kondisi": "Baru",
  "stok": 4
}
```

Response success:

```json
{ "message": "iPhone berhasil ditambahkan", "data": { ... } }
```

### PUT /api/iphones/:id

Header: `Authorization: Bearer <admin-token>`
Request body:

```json
{ "stok": 2 }
```

Response success:

```json
{ "message": "iPhone berhasil diperbarui", "data": { ... } }
```

### DELETE /api/iphones/:id

Header: `Authorization: Bearer <admin-token>`
Response success:

```json
{ "message": "iPhone berhasil dihapus" }
```

## Modul Peminjam

### GET /api/peminjam

Header: `Authorization: Bearer <token>`

### GET /api/peminjam/:id

Header: `Authorization: Bearer <token>`

### POST /api/peminjam

Header: `Authorization: Bearer <token>`
Request body:

```json
{
  "nama": "Arif",
  "nim": "1901006",
  "jurusan": "Teknik Informatika",
  "nomorTelepon": "081234567895",
  "email": "arif@mail.com"
}
```

### PUT /api/peminjam/:id

Header: `Authorization: Bearer <token>`

### DELETE /api/peminjam/:id

Header: `Authorization: Bearer <token>`

## Modul Peminjaman iPhone

### GET /api/peminjaman

Header: `Authorization: Bearer <token>`

### GET /api/peminjaman/:id

Header: `Authorization: Bearer <token>`

### POST /api/peminjaman

Header: `Authorization: Bearer <token>`
Request body:

```json
{
  "peminjamId": 1,
  "iphoneId": 1,
  "tanggalPinjam": "2026-06-06T10:00:00.000Z",
  "keterangan": "Peminjaman tugas"
}
```

### PUT /api/peminjaman/:id

Header: `Authorization: Bearer <token>`
Request body:

```json
{
  "tanggalKembali": "2026-06-10T10:00:00.000Z",
  "keterangan": "Perpanjangan"
}
```

### DELETE /api/peminjaman/:id

Header: `Authorization: Bearer <token>`

### PUT /api/peminjaman/:id/pengembalian

Header: `Authorization: Bearer <token>`
Response success:

```json
{ "message": "Pengembalian berhasil diproses", "data": { ... } }
```

## Dashboard

### GET /api/dashboard

Header: `Authorization: Bearer <token>`
Response success:

```json
{
  "totalIphone": 10,
  "iphoneTersedia": 8,
  "iphoneDipinjam": 2,
  "totalPeminjam": 5,
  "totalPeminjaman": 5,
  "peminjamanTerbaru": [ ... ]
}
```
