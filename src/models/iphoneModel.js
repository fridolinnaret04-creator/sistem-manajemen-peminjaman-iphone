import prisma from "../database/dbConfig.js";

export async function getAll() {
  return prisma.iphone.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getById(id) {
  return prisma.iphone.findUnique({
    where: { id: Number(id) },
  });
}

export async function createIphone(data) {
  return prisma.iphone.create({
    data,
  });
}

export async function updateIphone(id, data) {
  return prisma.iphone.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteIphone(id) {
  return prisma.iphone.delete({
    where: { id: Number(id) },
  });
}

export default {
  getAll,
  getById,
  createIphone,
  updateIphone,
  deleteIphone,
};
