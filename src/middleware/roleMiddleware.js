export default function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Akses ditolak. Hanya admin yang dapat mengakses resource ini." });
    }
    next();
  };
}
