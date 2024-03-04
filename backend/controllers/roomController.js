require("../db/associations.js");

const Room = require("../models/roomModel.js");

const addRoom = async (req, res, next) => {
  try {
    const { name, system_id } = req.body;
    const room = await Room.create({ name, system_id });
    res.send(room);
  } catch (err) {
    next(err);
  }
};

module.exports = { addRoom };
