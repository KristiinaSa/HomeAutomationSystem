require("../db/associations.js");

const Device = require("../models/deviceModel.js");
const Sensor = require("../models/sensorModel.js");

const getAllAccessories = async (req, res, next) => {
  try {
    const devices = await Device.findAll({
      attributes: ["id", "name", "type", "status"],
    });
    const sensors = await Sensor.findAll({
      attributes: ["id", "name", "type", "status"],
    });
    res.send({ devices, sensors });
  } catch (err) {
    next(err);
  }
};

const getAllDevices = async (req, res, next) => {
  try {
    const devices = await Device.findAll({
      attributes: ["id", "name", "type", "model", "room_id"],
    });
    console.log("devices:", devices);
    res.send(devices);
  } catch (err) {
    next(err);
  }
};

const getAllSensors = async (req, res, next) => {
  try {
    const sensors = await Sensor.findAll({
      attributes: ["id", "name", "value"],
    });
    console.log("sensors:", sensors);
    res.send(sensors);
  } catch (err) {
    next(err);
  }
};

const addDevice = async (req, res, next) => {
  try {
    const device = await Device.create(req.body);
    console.log("Added device:", device);
    res.send(device);
  } catch (err) {
    next(err);
  }
};

const deleteDevice = async (req, res, next) => {
  try {
    const device = await Device.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log("Deleted device:", device);
    res.send(device);
  } catch (err) {
    next(err);
  }
};

const toggleOnOff = async (req, res, next) => {
  try {
    const device = await Device.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!device) {
      return res.status(404).send("Device not found");
    }

    const newValue = device.value === "on" ? "off" : "on";

    await Device.update(
      {
        value: newValue,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const updatedDevice = await Device.findOne({
      where: {
        id: req.params.id,
      },
    });

    console.log("Toggled device:", updatedDevice);
    res.send(updatedDevice);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAccessories,
  getAllDevices,
  getAllSensors,
  addDevice,
  deleteDevice,
  toggleOnOff,
};
