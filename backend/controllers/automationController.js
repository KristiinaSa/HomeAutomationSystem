const { v4: uuidv4 } = require("uuid");
const automationModel = require("../dummyModels/automationModel.js");
require("../db/associations.js");
const { bitmaskToWeekdays, weekdaysToBitmask } = require("./helpers.js");

const TimeAutomation = require("../models/timeAutomationModel.js");
const SensorAutomation = require("../models/sensorAutomationModel.js");
const Device = require("../models/deviceModel.js");

const { ACTION_TO_STRING, STRING_TO_ACTION } = require("./helpers.js");

const getAutomations = async (req, res, next) => {
  const { system_id } = req.user;
  try {
    let timeAutomations = await TimeAutomation.findAll({
      where: {
        system_id,
      },
      attributes: [
        "id",
        "name",
        "weekdays",
        "time",
        "disabled",
        "type",
        "action",
      ],
      include: {
        model: Device,
        attributes: ["id", "name", "type"],
        through: { attributes: [] },
      },
    });

    let sensorAutomations = await SensorAutomation.findAll({
      where: {
        system_id,
      },
      attributes: ["id", "active"],
      include: {
        model: Device,
        attributes: ["id", "name", "type"],
        through: { attributes: [] },
      },
    });

    timeAutomations = timeAutomations.map((automation) => {
      const automationData = automation.toJSON();
      automationData.weekdays = bitmaskToWeekdays(automationData.weekdays);
      automationData.action = ACTION_TO_STRING[automationData.action];
      return automationData;
    });

    sensorAutomations = sensorAutomations.map((automation) => ({
      ...automation.toJSON(),
      type: "sensor",
      active: ACTION_TO_STRING[automation.active],
    }));

    const automations = [...timeAutomations, ...sensorAutomations];

    res.send(automations);
  } catch (err) {
    next(err);
  }
};

const getAutomation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const automation = automationModel.find((a) => a.id == id);
    if (!automation) {
      throw new Error("Automation not found");
    }
    res.send(automation);
  } catch (err) {
    next(err);
  }
};

const getTimerAutomation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const timerAutomation = await TimeAutomation.findOne({
      where: {
        id: id,
      },
      include: {
        model: Device,
        attributes: ["id", "name", "type"],
        through: { attributes: [] },
      },
      attributes: ["id", "weekdays", "time", "disabled", "name", "action"],
    });

    if (!timerAutomation) {
      const err = new Error("Automation not found");
      err.status = 404;
      throw err;
    }

    timerAutomation.weekdays = bitmaskToWeekdays(timerAutomation.weekdays);
    timerAutomation.type = "timer";
    timerAutomation.action = ACTION_TO_STRING[timerAutomation.action];
    res.send(timerAutomation);
  } catch (err) {
    next(err);
  }
};

const addAutomation = async (req, res, next) => {
  try {
    const newAutomation = {
      id: uuidv4(),
      ...req.body,
    };

    automationModel.push(newAutomation);
    res.send(newAutomation);
  } catch (err) {
    next(err);
  }
};

const addTimerAutomation = async (req, res, next) => {
  try {
    const { system_id } = req.user;
    const { devices, weekdays, ...automationData } = req.body;
    const requiredFields = ["name", "time", "disabled"];

    requiredFields.forEach((field) => {
      if (automationData[field] === undefined) {
        const err = new Error(`Missing required field: ${field}`);
        err.status = 400;
        throw err;
      }
    });

    if (!weekdays) {
      const err = new Error("Missing required field: weekdays");
      err.status = 400;
      throw err;
    }

    automationData.action = STRING_TO_ACTION[automationData.action];

    const newAutomation = await TimeAutomation.create({
      ...automationData,
      weekdays: weekdaysToBitmask(weekdays),
      system_id,
    });

    if (devices && devices.length > 0) {
      await newAutomation.addDevices(devices.map((device) => device.id));
    }

    res.send(newAutomation);
  } catch (err) {
    next(err);
  }
};

const editAutomation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const automationIndex = automationModel.findIndex((a) => a.id == id);

    if (automationIndex === -1) {
      throw new Error("Automation not found");
    }

    const updatedAutomation = {
      ...automationModel[automationIndex],
      ...req.body,
    };

    automationModel[automationIndex] = updatedAutomation;

    res.send(updatedAutomation);
  } catch (err) {
    next(err);
  }
};

const editTimerAutomation = async (req, res, next) => {
  try {
    const id = req.params.id;
    let { devices, weekdays, ...automationData } = req.body;
    const automation = await TimeAutomation.findOne({
      where: {
        id: id,
      },
    });

    if (!automation) {
      const err = new Error("Automation not found");
      err.status = 404;
      throw err;
    }

    if (
      !automationData.name ||
      !weekdays ||
      !automationData.time ||
      automationData.action === undefined
    ) {
      const err = new Error("Missing required fields");
      err.status = 400;
      throw err;
    }

    automationData.action =
      STRING_TO_ACTION[automationData.action.toLowerCase()];
    console.log("automationData:", automationData);

    await automation.update({
      ...automationData,
      weekdays: weekdaysToBitmask(weekdays),
    });

    if (devices && devices.length > 0) {
      await automation.setDevices(devices.map((device) => device.id));
    }

    res.send(automation);
  } catch (err) {
    next(err);
  }
};

const deleteAutomation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const automationIndex = automationModel.findIndex((a) => a.id == id);

    if (automationIndex === -1) {
      throw new Error("Automation not found");
    }

    const deletedAutomation = automationModel.splice(automationIndex, 1)[0];

    res.send(deletedAutomation);
  } catch (err) {
    next(err);
  }
};

const deleteTimerAutomation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const automation = await TimeAutomation.findOne({
      where: {
        id: id,
      },
    });

    if (!automation) {
      const err = new Error("Automation not found");
      err.status = 404;
      throw err;
    }

    await automation.destroy();
    res.send(automation);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAutomations,
  getAutomation,
  getTimerAutomation,
  addAutomation,
  addTimerAutomation,
  editAutomation,
  editTimerAutomation,
  deleteAutomation,
  deleteTimerAutomation,
};
