const request = require("supertest");
const app = require("../../app.js");

const getSequelize = require("../../db/db.js");
const sequelize = getSequelize();
require("../../db/associations.js");

const System = require("../../models/systemModel.js");
const TimeAutomation = require("../../models/timeAutomationModel.js");

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const system = await System.create({
    name: "Test System",
  });

  const room = await system.createRoom({
    name: "Test Room",
  });

  await room.createSensor({
    name: "Temperature Sensor 1",
    value: "23",
    data_type: "double",
    role_access: "owner",
    system_id: system.id,
  });

  await room.createDevice({
    name: "Table Lamp",
    type: "Light",
    model: "BOB-LED",
    value: "on",
    data_type: "boolean",
    role_access: "resident",
    system_id: system.id,
  });

  let timeautomation = await TimeAutomation.create({
    name: "Test Automation",
    weekdays: 127,
    time: "12:00",
    active: true,
    system_id: system.id,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /api/v1/automations", () => {
  it("should return all automations", async () => {
    const response = await request(app).get("/api/v1/automations");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });
}, 10000);
