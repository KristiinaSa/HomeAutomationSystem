const checkRole = async (req, res, next) => {
  try {
    const userData = req.user;
    if (userData.role !== "admin" && userData.role !== "owner") {
      return res.status(403).json({ message: "Buuuueeee" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkRole;
