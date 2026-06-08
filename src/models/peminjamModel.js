import prisma from "../database/dbConfig.js";

export async function getAll() {
  return prisma.peminjam.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getById(id) {
  return prisma.peminjam.findUnique({
    where: { id: Number(id) },
  });
}

export async function createPeminjam(data) {
  return prisma.peminjam.create({ data });
}

export async function updatePeminjam(id, data) {
  return prisma.peminjam.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deletePeminjam(id) {
  return prisma.peminjam.delete({
    where: { id: Number(id) },
  });
}

export default {
  getAll,
  getById,
  createPeminjam,
  updatePeminjam,
  deletePeminjam,
};
