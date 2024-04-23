const request = require("supertest");
const app = require("../../app.js");
const UsageHistory = require("../../models/usageHistoryModel.js");

const getSequelize = require("../../db/db.js");
const sequelize = getSequelize();
require("../../db/associations.js");

const System = require("../../models/systemModel.js");
const TimeAutomation = require("../../models/timeAutomationModel.js");
const Language = require("../../models/languageModel.js");
const Device = require("../../models/deviceModel.js");
const DeviceType = require("../../models/deviceTypeModel.js");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const bcrypt = require("bcryptjs");

let token;
let room;
let system;

async function createUser(system) {
  return await system.createUser({
    name: "Test User",
    email: "test@test.test",
    password: bcrypt.hashSync("password", 10),
    role: "owner",
    is_registered: true,
    system_id: system.id,
  });
}

async function createRoom(system) {
  return await system.createRoom({
    name: "Test Room",
  });
}

async function createSensor(room, system) {
  return await room.createSensor({
    name: "Temperature Sensor 1",
    value: "23",
    data_type: "double",
    role_access: "owner",
    system_id: system.id,
  });
}

async function createDevice(room, system) {
  return await room.createDevice({
    name: "Table Lamp",
    value: "on",
    data_type: "boolean",
    role_access: "resident",
    system_id: system.id,
    device_type_id: 1,
  });
}

async function createTimeAutomation(system) {
  return await TimeAutomation.create({
    name: "Test Automation",
    weekdays: 127,
    time: "12:00",
    disabled: true,
    system_id: system.id,
    action: "on",
  });
}

async function createLanguage() {
  return await Language.create({
    code: "en",
    name: "English",
  });
}

async function createDeviceType() {
  await DeviceType.create({
    name: "light",
  });
  await DeviceType.create({
    name: "fan",
  });
  await DeviceType.create({
    name: "tv",
  });
}

beforeEach(async () => {
  await sequelize.sync({ force: true });

  system = await System.create({
    name: "Test System",
  });

  await createDeviceType();

  const language = await createLanguage();
  const user = await createUser(system);
  room = await createRoom(system);
  await createSensor(room, system);
  await createDevice(room, system);
  await createTimeAutomation(system);

  const response = await request(app)
    .post("/api/v1/login")
    .send({ email: "test@test.test", password: "password" });

  token = response.body.token;
  expect(token).toBeDefined();
  expect(typeof token).toBe("string");
});

afterAll(async () => {
  await sequelize.close();
});

describe("getAllDevices", () => {
  it("should return all devices for the logged in user", async () => {
    const response = await request(app)
      .get("/api/v1/accessories/devices")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("addDevice", () => {
  it("should create a device when valid data is provided", async () => {
    const deviceData = {
      name: "Table Lamp",
      type: "Light",
      value: "on",
      room_id: 1,
      system_id: 1,
      device_type_id: 1,
    };

    const response = await request(app)
      .post("/api/v1/accessories/add-device")
      .set("Authorization", `Bearer ${token}`)
      .send(deviceData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(deviceData.name);
    expect(response.body.device_type_id).toBe(deviceData.device_type_id);
    expect(response.body.value).toBe(deviceData.value);
    expect(response.body.system_id).toBe(deviceData.system_id);
  });

  it("should return an error when the room does not exist", async () => {
    const deviceData = {
      name: "Table Lamp",
      type: "Light",
      value: "on",
      room_id: 9999,
    };

    const response = await request(app)
      .post("/api/v1/accessories/add-device")
      .set("Authorization", `Bearer ${token}`)
      .send(deviceData);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Room not found");
  });
});

describe("deleteDevice", () => {
  it("should delete a device when a valid id is provided", async () => {
    const device = await createDevice(room, system);

    const response = await request(app)
      .delete(`/api/v1/accessories/delete-device/${device.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Device deleted successfully");

    const deletedDevice = await Device.findByPk(device.id);
    expect(deletedDevice).toBeNull();
  });

  it("should return an error when the device does not exist", async () => {
    const response = await request(app)
      .delete("/api/v1/accessories/delete-device/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Device not found");
  });
});

describe("toggleOnOff", () => {
  it("should toggle a device's value when a valid id is provided", async () => {
    const device = await createDevice(room, system);

    const response = await request(app)
      .post(`/api/v1/accessories/toggle/${device.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.value).toBe(device.value === "on" ? "off" : "on");

    const updatedDevice = await Device.findByPk(device.id);
    expect(updatedDevice.value).toBe(device.value === "on" ? "off" : "on");
  });

  it("should return an error when the device does not exist", async () => {
    const response = await request(app)
      .post("/api/v1/accessories/toggle/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Device not found");
  });
});

describe("getDeviceAnalytics", () => {
  it("should return device analytics data", async () => {
    const device = await createDevice(room, system);
    await request(app)
      .post(`/api/v1/accessories/toggle/${device.id}`)
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post(`/api/v1/accessories/toggle/${device.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/api/v1/accessories/analytics")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[1]).toHaveProperty("id");
    expect(response.body[1]).toHaveProperty("name");
    expect(response.body[1]).toHaveProperty("room_name");
    expect(response.body[1]).toHaveProperty("active_time");
    expect(response.body[1]).toHaveProperty("last_interaction");

    const usageHistory = await UsageHistory.findAll({
      where: {
        device_id: device.id,
      },
    });
    expect(usageHistory.length).toBeGreaterThan(0);
  });
});
