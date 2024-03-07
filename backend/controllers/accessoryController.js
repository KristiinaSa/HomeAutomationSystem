require("../db/associations.js");

const Device = require("../models/deviceModel.js");
const Sensor = require("../models/sensorModel.js");
const Room = require("../models/roomModel.js");
const { TYPE_TO_DATA_TYPE } = require("./helpers.js");

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
      attributes: ["id", "name", "type", "room_id"],
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
    const room = await Room.findByPk(req.body.room_id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    req.body.data_type = TYPE_TO_DATA_TYPE[req.body.type];

    const device = await Device.create({
      ...req.body,
      system_id: room.system_id,
    });
    console.log("Added device:", device);
    res.send(device);
  } catch (err) {
    next(err);
  }
};

const deleteDevice = async (req, res, next) => {
  try {
    const device = await Device.destroy({ where: { id: req.params.id } });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Error deleting device" });
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

const getRoomDevices = async (req, res, next) => {
  try {
    const devices = await Device.findAll({
      where: {
        room_id: req.params.id,
      },
    });
    res.send(devices);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAccessories,
  getAllDevices,
  getAllSensors,
  addDevice,
  deleteDevice,
  toggleOnOff,
  getRoomDevices,
};
