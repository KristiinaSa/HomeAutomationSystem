const user = require("../models/userModel.js");

const checkRole = async (req, res, next) => {
  try {
    const userData = await user.findOne({
      where: { id: req.user.id },
      attributes: ["role"],
    });
    if (userData.role !== "admin" && userData.role !== "owner") {
      return res.status(403).json({ message: "Buuuueeee" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkRole;