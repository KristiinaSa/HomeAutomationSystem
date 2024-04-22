require("../db/associations.js");
const { eventEmitter } = require("../services/automationChecker.js");
const sequelize = require("../db/sequelizeConnector.js");

const Device = require("../models/deviceModel.js");
const User = require("../models/userModel.js");
const Sensor = require("../models/sensorModel.js");
const Room = require("../models/roomModel.js");
const UsageHistory = require("../models/usageHistoryModel.js");
const System = require("../models/systemModel.js");
const DeviceType = require("../models/deviceTypeModel.js");
const { Op } = require("sequelize");

const clients = new Map();

const { TYPE_TO_DATA_TYPE } = require("./helpers.js");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

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
  const { system_id } = req.user;
  try {
    let devices = await Device.findAll({
      where: { system_id },
      attributes: ["id", "name", "room_id", "value"],
      include: [
        {
          model: Room,
          attributes: ["name"],
        },
        {
          model: DeviceType,
          attributes: ["name"],
          as: "device_type",
        },
      ],
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
  console.log("Adding device:", req.body);
  try {
    const room = await Room.findByPk(req.body.room_id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const deviceType = await DeviceType.findOne({
      where: { name: req.body.type },
    });
    if (!deviceType) {
      return res.status(404).json({ error: "Device type not found" });
    }

    const device = await room.createDevice({
      ...req.body,
      system_id: room.system_id,
    });

    await device.setDevice_type(deviceType);
    res.send(device);
  } catch (err) {
    console.log("Error adding device:", err);
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
      return res.status(404).json({ message: "Device not found" });
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
  const { system_id } = req.user;
  try {
    const system = await System.findOne({
      where: {
        id: system_id,
      },
    });
    const systemTimezone = system.time_zone;

    const devices = await Device.findAll({
      where: {
        system_id: system_id,
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
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [
        ["device_id", "ASC"],
        ["timestamp", "ASC"],
      ],
    });

    const lastInteractions = await Promise.all(
      devices.map((device) =>
        UsageHistory.findOne({
          where: {
            device_id: device.id,
          },
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
          order: [["timestamp", "DESC"]],
        })
      )
    );

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
      let periodStart;
      for (const period of activePeriods) {
        if (period.sensor_value === "on" && !periodStart) {
          periodStart = new Date(period.timestamp);
        } else if (period.sensor_value === "off" && periodStart) {
          const periodEnd = new Date(period.timestamp);
          totalActiveTime += periodEnd - periodStart;
          periodStart = null;
        }
      }

      if (periodStart) {
        totalActiveTime += new Date() - periodStart;
      }

      const totalActiveTimeInMinutes = Math.floor(totalActiveTime / 1000 / 60);

      const lastInteractionEntry = lastInteractions.find(
        (interaction) => interaction && interaction.device_id === device.id
      );
      const lastInteractionDate = lastInteractionEntry
        ? dayjs.utc(lastInteractionEntry.timestamp).tz(systemTimezone)
        : undefined;
      const lastInteractionUser = lastInteractionEntry
        ? lastInteractionEntry.user.name
        : undefined;
      const lastInteractionTime = lastInteractionEntry
        ? {
            date: lastInteractionDate.toISOString(),
            user: lastInteractionUser,
          }
        : undefined;
      result.push({
        id: device.id,
        name: device.name,
        type: device.type,
        room_name: device.room.name,
        active_time: totalActiveTimeInMinutes,
        last_interaction: lastInteractionTime,
      });
    }

    console.log("Device analytics:", result);

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

  // Siirrä REDIS-tietokantaan tulevaisuudessa
  if (!clients.has(system_id)) {
    clients.set(system_id, []);
  }
  clients.get(system_id).push(res);

  eventEmitter.on("devicesUpdated", (updatedSystemId) => {
    if (updatedSystemId === system_id) {
      res.write(`data: ${JSON.stringify({ systemId: updatedSystemId })}\n\n`);
    }
  });

  req.on("close", () => {
    const systemClients = clients.get(system_id);
    const index = systemClients.indexOf(res);
    if (index !== -1) {
      systemClients.splice(index, 1);
    }
  });
};

const getDeviceTypes = async (req, res, next) => {
  try {
    const deviceTypes = await DeviceType.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn("COUNT", sequelize.col("devices.device_type_id")),
          "deviceCount",
        ],
      ],
      include: [
        {
          model: Device,
          attributes: [],
        },
      ],
      group: ["device_type.id", "device_type.name"],
      raw: true,
    });

    console.log("Device types:", deviceTypes);
    res.send(deviceTypes);
  } catch (err) {
    console.log("Error getting device types:", err);
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
  getRoomDevices,
  getDeviceAnalytics,
  updateDeviceStatus,
  getDeviceTypes,
};
