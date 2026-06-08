import prisma from "../database/dbConfig.js";

export async function getAll() {
  return prisma.peminjaman.findMany({
    orderBy: { createdAt: "desc" },
    include: { peminjam: true, iphone: true },
  });
}

export async function getById(id) {
  return prisma.peminjaman.findUnique({
    where: { id: Number(id) },
    include: { peminjam: true, iphone: true },
  });
}

export async function createPeminjaman(data) {
  return prisma.peminjaman.create({
    data,
    include: { peminjam: true, iphone: true },
  });
}

export async function updatePeminjaman(id, data) {
  return prisma.peminjaman.update({
    where: { id: Number(id) },
    data,
    include: { peminjam: true, iphone: true },
  });
}

export async function deletePeminjaman(id) {
  return prisma.peminjaman.delete({
    where: { id: Number(id) },
  });
}

export default {
  getAll,
  getById,
  createPeminjaman,
  updatePeminjaman,
  deletePeminjaman,
};
