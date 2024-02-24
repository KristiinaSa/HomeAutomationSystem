import { v4 as uuidv4 } from "uuid";
import automationModel from "../dummyModels/automationModel.js";

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
};
