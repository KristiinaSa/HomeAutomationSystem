import { v4 as uuidv4 } from "uuid";
import automationModel from "../dummyModels/automationModel.js";
import "../db/associations.js";
import { bitmaskToWeekdays, weekdaysToBitmask } from "./helpers.js";

import TimeAutomation from "../models/timeAutomationModel.js";
import SensorAutomation from "../models/sensorAutomationModel.js";
import Device from "../models/deviceModel.js";

const getAutomations = async (req, res, next) => {
  try {
    let timeAutomations = await TimeAutomation.findAll({
      attributes: ["id", "name", "weekdays", "time", "active", "type"],
      include: {
        model: Device,
        attributes: ["id", "name", "type"],
        through: { attributes: [] },
      },
    });
    let sensorAutomations = await SensorAutomation.findAll({
      attributes: ["id", "active"],
      include: {
        model: Device,
        attributes: ["id", "name", "type"],
        through: { attributes: [] },
      },
    });

    timeAutomations = timeAutomations.map((automation) => {
      automation.weekdays = bitmaskToWeekdays(automation.weekdays);
      return automation;
    });

    sensorAutomations = sensorAutomations.map((automation) => ({
      ...automation.toJSON(),
      type: "sensor",
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
      attributes: ["id", "weekdays", "time", "active"],
    });

    if (timerAutomation) {
      timerAutomation.weekdays = bitmaskToWeekdays(timerAutomation.weekdays);
      timerAutomation.type = "timer";
    }
    console.log(timerAutomation);
    res.send(timerAutomation);
  } catch (err) {
    next(err);
  }
};

const addAutomation = async (req, res, next) => {
  console.log(req.body);
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
    const { devices, weekdays, ...automationData } = req.body;
    const newAutomation = await TimeAutomation.create({
      ...automationData,
      weekdays: weekdaysToBitmask(weekdays),
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
    const { devices, weekdays, ...automationData } = req.body;
    const automation = await TimeAutomation.findOne({
      where: {
        id: id,
      },
    });

    if (!automation) {
      throw new Error("Automation not found");
    }

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
      throw new Error("Automation not found");
    }
    await automation.destroy();
    res.send(automation);
  } catch (err) {
    next(err);
  }
};

export {
  getAutomations,
  getAutomation,
  addAutomation,
  editAutomation,
  deleteAutomation,
  getTimerAutomation,
  addTimerAutomation,
  editTimerAutomation,
  deleteTimerAutomation,
};
