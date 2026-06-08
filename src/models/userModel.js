import prisma from "../database/dbConfig.js";

export async function findByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function findById(id) {
  return await prisma.user.findUnique({
    where: {
      id: BigInt(id),
    },
  });
}

export async function createUser(data) {
  const user = await prisma.user.create({
    data,
  });

  return {
    ...user,
    id: user.id.toString(),
  };
}

export default {
  findByEmail,
  findById,
  createUser,
};