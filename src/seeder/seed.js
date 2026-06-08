import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../database/dbConfig.js";

async function main() {
  const adminEmail = "admin@gmail.com";
  const adminPassword = bcrypt.hashSync("admin123", 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: adminPassword,
      role: "ADMIN",
    },
    create: {
      name: "Admin iPhone",
      email: adminEmail,
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const iphoneData = [
    { nama_iphone: "iPhone 14", seri: "A2890", warna: "Hitam", kapasitas: "128GB", kondisi: "Baru", status: "Tersedia", stok: 5 },
    { nama_iphone: "iPhone 14 Pro", seri: "A2892", warna: "Perak", kapasitas: "256GB", kondisi: "Baru", status: "Tersedia", stok: 3 },
    { nama_iphone: "iPhone 13", seri: "A2634", warna: "Merah", kapasitas: "128GB", kondisi: "Bekas", status: "Tersedia", stok: 2 },
    { nama_iphone: "iPhone 13 Mini", seri: "A2628", warna: "Biru", kapasitas: "64GB", kondisi: "Bekas", status: "Tersedia", stok: 4 },
    { nama_iphone: "iPhone 12", seri: "A2403", warna: "Putih", kapasitas: "64GB", kondisi: "Bekas", status: "Tersedia", stok: 3 },
    { nama_iphone: "iPhone 12 Pro", seri: "A2407", warna: "Grafit", kapasitas: "128GB", kondisi: "Bekas", status: "Tersedia", stok: 2 },
    { nama_iphone: "iPhone 11", seri: "A2221", warna: "Kuning", kapasitas: "64GB", kondisi: "Bekas", status: "Tersedia", stok: 6 },
    { nama_iphone: "iPhone SE", seri: "A2296", warna: "Merah", kapasitas: "64GB", kondisi: "Baru", status: "Tersedia", stok: 5 },
    { nama_iphone: "iPhone XR", seri: "A2105", warna: "Hitam", kapasitas: "128GB", kondisi: "Bekas", status: "Tersedia", stok: 3 },
    { nama_iphone: "iPhone 8", seri: "A1905", warna: "Emas", kapasitas: "64GB", kondisi: "Bekas", status: "Tersedia", stok: 2 },
  ];

  const peminjamData = [
    { nama: "Andi Prasetyo", nim: "1901001", jurusan: "Teknik Informatika", nomorTelepon: "081234567890", email: "andi@mail.com" },
    { nama: "Budi Santoso", nim: "1901002", jurusan: "Sistem Informasi", nomorTelepon: "081234567891", email: "budi@mail.com" },
    { nama: "Citra Dewi", nim: "1901003", jurusan: "Teknik Komputer", nomorTelepon: "081234567892", email: "citra@mail.com" },
    { nama: "Dina Putri", nim: "1901004", jurusan: "Manajemen Informatika", nomorTelepon: "081234567893", email: "dina@mail.com" },
    { nama: "Eko Wijaya", nim: "1901005", jurusan: "Teknik Elektro", nomorTelepon: "081234567894", email: "eko@mail.com" },
  ];

  await prisma.iphone.createMany({ data: iphoneData });
  await prisma.peminjam.createMany({ data: peminjamData });

  const createdIphones = await prisma.iphone.findMany({ orderBy: { id: "asc" }, take: 5 });
  const createdPeminjams = await prisma.peminjam.findMany({ orderBy: { id: "asc" }, take: 5 });

  const peminjamanData = [
    {
      peminjamId: createdPeminjams[0].id,
      iphoneId: createdIphones[0].id,
      tanggalPinjam: new Date(),
      status: "Dipinjam",
      keterangan: "Peminjaman untuk tugas kampus",
    },
    {
      peminjamId: createdPeminjams[1].id,
      iphoneId: createdIphones[1].id,
      tanggalPinjam: new Date(),
      status: "Dipinjam",
      keterangan: "Peminjaman praktikum",
    },
    {
      peminjamId: createdPeminjams[2].id,
      iphoneId: createdIphones[2].id,
      tanggalPinjam: new Date(),
      status: "Dipinjam",
      keterangan: "Uji coba alat",
    },
    {
      peminjamId: createdPeminjams[3].id,
      iphoneId: createdIphones[3].id,
      tanggalPinjam: new Date(),
      status: "Dipinjam",
      keterangan: "Keperluan presentasi",
    },
    {
      peminjamId: createdPeminjams[4].id,
      iphoneId: createdIphones[4].id,
      tanggalPinjam: new Date(),
      status: "Dipinjam",
      keterangan: "Penggunaan lab",
    },
  ];

  for (const peminjaman of peminjamanData) {
    await prisma.peminjaman.create({ data: peminjaman });
    const iphone = await prisma.iphone.findUnique({ where: { id: peminjaman.iphoneId } });
    if (iphone) {
      const updatedStock = iphone.stok - 1;
      await prisma.iphone.update({
        where: { id: iphone.id },
        data: {
          stok: updatedStock,
          status: updatedStock <= 0 ? "Dipinjam" : "Tersedia",
        },
      });
    }
  }

  console.log("Seeder selesai. Admin default telah dibuat dan data awal ditambahkan.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
