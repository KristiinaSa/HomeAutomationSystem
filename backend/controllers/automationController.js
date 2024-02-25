import { v4 as uuidv4 } from "uuid";
import automationModel from "../dummyModels/automationModel.js";
import "../db/associations.js";
import { bitmaskToWeekdays, weekdaysToBitmask } from "./helpers.js";

import TimeAutomation from "../models/timeAutomationModel.js";
import Device from "../models/deviceModel.js";

const getAutomations = async (req, res, next) => {
  try {
    res.send(automationModel);
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
    const timerAutomations = await TimeAutomation.findAll({
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

    timerAutomations.forEach((automation) => {
      automation.weekdays = bitmaskToWeekdays(automation.weekdays);
    });

    console.log(timerAutomations);
    res.send(timerAutomations);
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

export {
  getAutomations,
  getAutomation,
  addAutomation,
  editAutomation,
  deleteAutomation,
  getTimerAutomation,
  addTimerAutomation,
};
