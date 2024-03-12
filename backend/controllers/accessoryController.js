require("../db/associations.js");
const { eventEmitter } = require("../services/automationChecker.js");

const Device = require("../models/deviceModel.js");
const Sensor = require("../models/sensorModel.js");
const Room = require("../models/roomModel.js");
const UsageHistory = require("../models/usageHistoryModel.js");
const { Op } = require("sequelize");

const clients = new Map();

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
      attributes: ["id", "name", "type", "room_id", "value"],
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

    await UsageHistory.create({
      device_id: updatedDevice.id,
      user_id: req.user.id,
      sensor_value: newValue,
      data_type: updatedDevice.data_type,
      timestamp: new Date(),
    });

    console.log("Toggled device:", updatedDevice);

    eventEmitter.emit("devicesUpdated", updatedDevice.system_id);

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
};

const getDeviceAnalytics = async (req, res, next) => {
  try {
    const devices = await Device.findAll({
      where: {
        system_id: 1,
      },
      include: [
        {
          model: Room,
          attributes: ["name"],
        },
      ],
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const activePeriodsToday = await UsageHistory.findAll({
      where: {
        device_id: {
          [Op.in]: devices.map((device) => device.id),
        },
        timestamp: {
          [Op.gte]: startOfToday,
        },
      },
      order: [
        ["device_id", "ASC"],
        ["timestamp", "ASC"],
      ],
    });

    const activePeriodsByDevice = activePeriodsToday.reduce((groups, entry) => {
      if (!groups[entry.device_id]) {
        groups[entry.device_id] = [];
      }
      groups[entry.device_id].push(entry);
      return groups;
    }, {});

    const result = [];
    for (const device of devices) {
      let totalActiveTime = 0;
      const activePeriods = activePeriodsByDevice[device.id] || [];
      for (let i = 0; i < activePeriods.length; i += 2) {
        const periodStart = new Date(activePeriods[i].timestamp);
        const periodEnd =
          i + 1 < activePeriods.length
            ? new Date(activePeriods[i + 1].timestamp)
            : new Date();
        if (periodStart < startOfToday && periodEnd >= startOfToday) {
          totalActiveTime += periodEnd - startOfToday;
        } else {
          totalActiveTime += periodEnd - periodStart;
        }
      }

      const totalActiveHours = Math.floor(totalActiveTime / 1000 / 60 / 60);
      const totalActiveMinutes = Math.floor((totalActiveTime / 1000 / 60) % 60);

      const lastInteractionDate = activePeriods[activePeriods.length - 1]
        ? new Date(activePeriods[activePeriods.length - 1].timestamp)
        : undefined;
      const lastInteractionTime = lastInteractionDate
        ? `${lastInteractionDate.toLocaleDateString()} ${lastInteractionDate.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}`
        : undefined;
      result.push({
        id: device.id,
        name: device.name,
        type: device.type,
        room_name: device.room.name,
        active_time: `${totalActiveHours}h ${totalActiveMinutes}m`,
        last_interaction: lastInteractionTime,
      });
    }

    res.send(result);
  } catch (err) {
    next(err);
  }
};

const updateDeviceStatus = async (req, res, next) => {
  const { system_id } = req.user;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Add the response object to the list of connected clients for this system
  if (!clients.has(system_id)) {
    clients.set(system_id, []);
  }
  clients.get(system_id).push(res);

  // Listen for the 'devicesUpdated' event and send an update to the frontend when the event is fired
  eventEmitter.on("devicesUpdated", (updatedSystemId) => {
    if (updatedSystemId === system_id) {
      res.write(`data: ${JSON.stringify({ systemId: updatedSystemId })}\n\n`);
    }
  });

  req.on("close", () => {
    // Remove the response object from the list of connected clients when the connection is closed
    const systemClients = clients.get(system_id);
    const index = systemClients.indexOf(res);
    if (index !== -1) {
      systemClients.splice(index, 1);
    }
  });
};

module.exports = {
  getAllAccessories,
  getAllDevices,
  getAllSensors,
  addDevice,
  deleteDevice,
  toggleOnOff,
  getRoomDevices,
  getDeviceAnalytics,
  updateDeviceStatus,
};
