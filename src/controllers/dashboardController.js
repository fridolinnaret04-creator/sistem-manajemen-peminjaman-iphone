import prisma from "../database/dbConfig.js";

export default {
  getDashboard: async (req, res, next) => {
    try {
      const totalIphone = await prisma.iphone.count();
      const iphoneTersedia = await prisma.iphone.count({ where: { status: "Tersedia" } });
      const iphoneDipinjam = await prisma.iphone.count({ where: { status: "Dipinjam" } });
      const totalPeminjam = await prisma.peminjam.count();
      const totalPeminjaman = await prisma.peminjaman.count();
      const peminjamanTerbaru = await prisma.peminjaman.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { peminjam: true, iphone: true },
      });

      res.json({
        totalIphone,
        iphoneTersedia,
        iphoneDipinjam,
        totalPeminjam,
        totalPeminjaman,
        peminjamanTerbaru,
      });
    } catch (error) {
      next(error);
    }
  },
};
