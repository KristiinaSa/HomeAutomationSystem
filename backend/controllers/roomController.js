require("../db/associations.js");

const Room = require("../models/roomModel.js");

const addRoom = async (req, res, next) => {
  try {
    const { system_id } = req.user;
    const { name } = req.body;
    const room = await Room.create({ name, system_id });
    res.send(room);
  } catch (err) {
    next(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const { system_id } = req.user;
    const rooms = await Room.findAll({
      where: {
        system_id,
      },
    });
    res.send(rooms);
  } catch (err) {
    next(err);
  }
};

module.exports = { addRoom, getRooms };
