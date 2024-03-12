// Adds some basic data to the database for testing purposes
require("./associations.js");
const bcrypt = require("bcryptjs");

const System = require("../models/systemModel.js");
const Room = require("../models/roomModel.js");
const Sensor = require("../models/sensorModel.js");
const Device = require("../models/deviceModel.js");
const TimeAutomation = require("../models/timeAutomationModel.js");
const ValueType = require("../models/valueTypeModel.js");
const CurrentValue = require("../models/currentValueModel.js");
const SensorHistory = require("../models/sensorHistoryModel.js");
const UsageHistory = require("../models/usageHistoryModel.js");

const sequelize = require("./sequelizeConnector.js");

async function addTestData() {
  await sequelize.sync({ force: true });
  const system = await System.create({
    name: "Test System",
  });

  const user = await system.createUser({
    name: "test",
    email: "test@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "owner",
  });

  const room = await system.createRoom({
    name: "Test Room",
  });

  const sensor1 = await room.createSensor({
    name: "Temperature Sensor 1",
    role_access: "owner",
    system_id: system.id,
  });

  const sensor2 = await room.createSensor({
    name: "Humidity Sensor 2",
    role_access: "owner",
    system_id: system.id,
  });

  const valueType = await ValueType.create({
    type: "Temperature",
    unit: "°C",
    data_type: "double",
  });

  const valueType2 = await ValueType.create({
    type: "Humidity",
    unit: "%",
    data_type: "int",
  });

  const sensorHistoryData1 = Array.from({ length: 100 }, (_, i) => ({
    sensor_id: sensor1.id,
    sensor_value: Math.random() * 100,
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
    data_type: "double",
  }));

  const sensorHistoryData2 = Array.from({ length: 100 }, (_, i) => ({
    sensor_id: sensor1.id,
    sensor_value: Math.random() * 100,
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
    data_type: "int",
  }));

  await SensorHistory.bulkCreate(sensorHistoryData1);
  await SensorHistory.bulkCreate(sensorHistoryData2);

  await sensor1.addValueType(valueType);
  await sensor2.addValueType(valueType2);

  const devices = await Promise.all([
    room.createDevice({
      name: "Table Lamp",
      type: "light",
      data_type: "boolean",
      system_id: system.id,
    }),
    room.createDevice({
      name: "Ceiling Lamp",
      type: "light",
      data_type: "boolean",
      system_id: system.id,
    }),
  ]);

  const timeAutomations = await TimeAutomation.bulkCreate([
    {
      name: "Test Automation 1",
      weekdays: 127,
      time: "10:00",
      action: "on",
      system_id: system.id,
    },
    {
      name: "Test Automation 2",
      weekdays: 127,
      time: "22:00",
      action: "off",
      system_id: system.id,
    },
  ]);

  await timeAutomations[0].addDevice(devices);
  await timeAutomations[1].addDevice(devices);

  console.log("Test data added successfully");
}

addTestData();
