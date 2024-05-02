const user = require("../models/userModel.js");

const getUserData = async (req, res, next) => {
  try {
    const userData = await user.findOne({
      where: { id: req.user.id },
      attributes: ["system_id", "role"],
    });
    req.user.system_id = userData.system_id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = getUserData;
