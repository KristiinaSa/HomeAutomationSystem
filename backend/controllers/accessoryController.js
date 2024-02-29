require("../db/associations.js");

const Device = require("../models/deviceModel.js");
const Sensor = require("../models/sensorModel.js");

// Gets all devices and sensors from the database
const getAllAccessories = async (req, res, next) => {
  try {
    const devices = await Device.findAll();
    const sensors = await Sensor.findAll();
    res.send({ devices, sensors });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllAccessories };
