# Sistem Peminjaman iPhone

Aplikasi REST API untuk sistem peminjaman iPhone menggunakan Express.js, Prisma, MySQL, dan JWT Authentication.

## Teknologi

- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT Authentication
- bcryptjs
- express-validator
- dotenv
- cors

## Struktur Folder

```
src/
├── controllers/
├── database/
├── middleware/
├── models/
├── routes/
├── validators/
├── seeder/
└── index.js
prisma/
└── schema.prisma
```

## Cara instalasi

1. Jalankan `npm install`
2. Salin `.env.example` menjadi `.env`
3. Buat database MySQL dengan nama `db.iphone_rental` di phpMyAdmin atau client MySQL lain.
4. Ubah `DATABASE_URL` jika username, password, atau host MySQL berbeda.
5. Pastikan `JWT_SECRET` sudah diisi

## Setup Prisma

1. Jalankan `npm run prisma:generate`
2. Jalankan migrasi database:
   ```bash
   npm run prisma:migrate
   ```

## Seed Database

Jalankan:

```bash
npm run seed
```

## Menjalankan Server

```bash
npm run dev
```

## Akun Admin Default

- Email: `admin@gmail.com`
- Password: `admin123`

## Dokumentasi

- API: `docs/API_DOCUMENTATION.md`
- Pengujian: `docs/PENGUJIAN.md`

## Catatan

Gunakan header `Authorization: Bearer <token>` untuk semua endpoint yang memerlukan autentikasi.
