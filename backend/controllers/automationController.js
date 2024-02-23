import { v4 as uuidv4 } from "uuid";

import automationModel from "../dummyModels/automationModel.js";

const getAutomations = async (req, res) => {
  res.send(automationModel);
};

const getAutomation = async (req, res) => {
  const id = req.params.id;
  const automation = automationModel.find((a) => a.id == id);
  res.send(automation);
};

const addAutomation = async (req, res) => {
  const newAutomation = {
    id: uuidv4(),
    ...req.body,
  };

  automationModel.push(newAutomation);
  res.send(newAutomation);
};

const editAutomation = async (req, res) => {
  const id = req.params.id;
  const automationIndex = automationModel.findIndex((a) => a.id == id);

  if (automationIndex === -1) {
    res.status(404).send({ message: "Automation not found" });
    return;
  }

  const updatedAutomation = {
    ...automationModel[automationIndex],
    ...req.body,
  };

  automationModel[automationIndex] = updatedAutomation;

  res.send(updatedAutomation);
};

const deleteAutomation = async (req, res) => {
  const id = req.params.id;
  const automationIndex = automationModel.findIndex((a) => a.id == id);

  if (automationIndex === -1) {
    res.status(404).send({ message: "Automation not found" });
    return;
  }

  const deletedAutomation = automationModel.splice(automationIndex, 1)[0];

  res.send(deletedAutomation);
};
export {
  getAutomations,
  getAutomation,
  addAutomation,
  editAutomation,
  deleteAutomation,
};
