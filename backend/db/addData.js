// Adds some basic data to the database for testing purposes

import System from "../models/systemModel.js";
import Room from "../models/roomModel.js";
import Sensor from "../models/sensorModel.js";
import Device from "../models/deviceModel.js";
import TimeAutomation from "../models/timeAutomationModel.js";

async function addTestData() {
  const system = await System.create({
    name: "Test System",
  });

  const room = await Room.create({
    name: "Test Room",
    system_id: system.id,
  });

  const sensors = await Sensor.bulkCreate([
    {
      sensor_type: "Temperature",
      value: "23",
      data_type: "double",
      role_access: "owner",
      room_id: room.id,
      system_id: system.id,
    },
    {
      sensor_type: "Humidity",
      value: "38",
      data_type: "int",
      role_access: "owner",
      room_id: room.id,
      system_id: system.id,
    },
  ]);

  const devices = await Device.bulkCreate([
    {
      device_name: "Table Lamp",
      device_type: "Light",
      device_model: "BOB-LED",
      sensor_value: "on",
      data_type: "boolean",
      role_access: "resident",
      system_id: system.id,
      room_id: room.id,
    },
    {
      device_name: "Ceiling Lamp",
      device_type: "Light",
      device_model: "DAN-LED",
      sensor_value: "off",
      data_type: "boolean",
      role_access: "resident",
      system_id: system.id,
      room_id: room.id,
    },
  ]);

  const timeAutomations = await TimeAutomation.bulkCreate([
    {
      device_id: devices[0].id,
      name: "Test Automation 1",
      is_active: true,
      weekdays: 127,
      time: "10:00",
      action: "on",
    },
    {
      device_id: devices[1].id,
      name: "Test Automation 2",
      is_active: true,
      weekdays: 127,
      time: "22:00",
      action: "off",
    },
  ]);
}

addTestData();
