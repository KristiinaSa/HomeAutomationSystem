const user = require("../models/userModel.js");

const checkRole = async (req, res, next) => {
  try {
    const userData = req.user;
    if (userData.role !== "admin" && userData.role !== "owner") {
      return res.status(403).json({ message: "Buuuueeee" });
    }

    console.log("req.params.id", req.params.id);
    if (req.params.id) {
      const targetUserData = await user.findOne({
        where: { id: req.params.id },
        attributes: ["role"],
      });

      if (targetUserData && targetUserData.role === "owner") {
        return res.status(403).json({ message: "Cannot modify the owner!" });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkRole;
