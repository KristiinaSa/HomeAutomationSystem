// Adds some basic data to the database for testing purposes
require("./associations.js");

const System = require("../models/systemModel.js");
const Room = require("../models/roomModel.js");
const Sensor = require("../models/sensorModel.js");
const Device = require("../models/deviceModel.js");
const TimeAutomation = require("../models/timeAutomationModel.js");
const ValueType = require("../models/valueTypeModel.js");

async function addTestData() {
  const system = await System.create({
    name: "Test System",
  });

  const room = await system.createRoom({
    name: "Test Room",
  });

  const sensor1 = await room.createSensor({
    name: "Temperature Sensor 1",
    value: "23",
    data_type: "double",
    role_access: "owner",
    system_id: system.id,
  });

  const sensor2 = await room.createSensor({
    name: "Humidity Sensor 2",
    value: "38",
    data_type: "int",
    role_access: "owner",
    system_id: system.id,
  });

  const valueType = await ValueType.create({ type: "Temperature", unit: "°C" });
  const valueType2 = await ValueType.create({ type: "Humidity", unit: "%" });

  await sensor1.addValueType(valueType);
  await sensor2.addValueType(valueType2);

  const devices = await Promise.all([
    room.createDevice({
      name: "Table Lamp",
      type: "Light",
      model: "BOB-LED",
      value: "on",
      data_type: "boolean",
      role_access: "resident",
      system_id: system.id,
    }),
    room.createDevice({
      name: "Ceiling Lamp",
      type: "Light",
      model: "DAN-LED",
      value: "off",
      data_type: "boolean",
      role_access: "resident",
      system_id: system.id,
    }),
  ]);

  const timeAutomations = await TimeAutomation.bulkCreate([
    {
      name: "Test Automation 1",
      active: true,
      weekdays: 127,
      time: "10:00",
      action: "on",
      system_id: system.id,
    },
    {
      name: "Test Automation 2",
      active: true,
      weekdays: 127,
      time: "22:00",
      action: "off",
      system_id: system.id,
    },
  ]);

  await timeAutomations[0].addDevice(devices);
  await timeAutomations[1].addDevice(devices);

  const user = await system.createUser({
    name: "test",
    email: "test@example.com",
    password: "password",
    role: "owner",
  });

  console.log("Test data added successfully");
}

addTestData();
