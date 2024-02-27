import "../db/associations.js";

import Device from "../models/deviceModel.js";
import Sensor from "../models/sensorModel.js";

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

export { getDevices };
