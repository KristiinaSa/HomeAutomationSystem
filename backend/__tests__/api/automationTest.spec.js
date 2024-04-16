const request = require("supertest");
const app = require("../../app.js");

const getSequelize = require("../../db/db.js");
const sequelize = getSequelize();
require("../../db/associations.js");

const System = require("../../models/systemModel.js");
const TimeAutomation = require("../../models/timeAutomationModel.js");
const Language = require("../../models/languageModel.js");

const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const system = await System.create({
    name: "Test System",
  });

  const language = await Language.create({
    name: "English",
    code: "en",
  });

  const user = await system.createUser({
    name: "Test User",
    email: "test@test.test",
    password: bcrypt.hashSync("password", 10),
    role: "owner",
    is_registered: true,
    system_id: system.id,
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
    value: "on",
    data_type: "boolean",
    role_access: "resident",
    system_id: system.id,
  });

  let timeautomation = await TimeAutomation.create({
    name: "Test Automation",
    weekdays: 127,
    time: "12:00",
    disabled: true,
    system_id: system.id,
    action: "on",
  });

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

describe("GET /api/v1/automations", () => {
  it("should return all automations", async () => {
    const response = await request(app)
      .get("/api/v1/automations")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });
}, 10000);

describe("GET /api/v1/automations/:id", () => {
  it("should return the automation with the given id", async () => {
    const newAutomation = await TimeAutomation.create({
      name: "Test Automation 2",
      weekdays: 127,
      time: "12:00",
      disabled: true,
      devices: [
        {
          name: "Test Device",
          type: "light",
          value: "on",
          data_type: "boolean",
        },
      ],
      system_id: 1,
    });

    const response = await request(app)
      .get(`/api/v1/automations/timer/${newAutomation.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", newAutomation.id);
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "12:00");
    expect(response.body).toHaveProperty("disabled", true);
    expect(response.body).toHaveProperty("name", "Test Automation 2");
    expect(response.body).toHaveProperty("type", "timer");
  });
}, 10000);

describe("POST /api/v1/automations/timer", () => {
  it("should create a new automation", async () => {
    const newAutomationData = {
      name: "Test Automation 3",
      weekdays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      time: "12:00",
      disabled: false,
      system_id: 1,
      devices: [
        {
          id: 1,
        },
      ],
      action: "Turn On",
    };

    const response = await request(app)
      .post("/api/v1/automations/timer")
      .send(newAutomationData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "12:00");
    expect(response.body).toHaveProperty("disabled", false);
    expect(response.body).toHaveProperty("name", "Test Automation 3");
  });
}, 10000);

describe("POST /api/v1/automations/timer", () => {
  it("should return 400 if required fields are missing", async () => {
    const newAutomationData = {
      weekdays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      time: "12:00",
      active: true,
      system_id: 1,
      devices: [
        {
          id: 1,
        },
      ],
      action: "Turn On",
    };

    const response = await request(app)
      .post("/api/v1/automations/timer")
      .send(newAutomationData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
}, 10000);

describe("PUT /api/v1/automations/timer/:id", () => {
  it("should update the automation with the given id", async () => {
    const newAutomation = await TimeAutomation.create({
      name: "Test Automation 4",
      weekdays: 127,
      time: "12:00",
      disabled: true,
      system_id: 1,
      action: "Turn On",
    });

    const updatedAutomationData = {
      name: "Updated Automation",
      action: "on",
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      time: "13:00",
      disabled: false,
      devices: [
        {
          id: 1,
        },
      ],
      action: "Turn Off",
    };

    const response = await request(app)
      .put(`/api/v1/automations/timer/${newAutomation.id}`)
      .send(updatedAutomationData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", newAutomation.id);
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "13:00");
    expect(response.body).toHaveProperty("disabled", false);
    expect(response.body).toHaveProperty("name", "Updated Automation");
  });
}, 10000);

describe("PUT /api/v1/automations/timer/:id", () => {
  it("should return 404 if automation with given id does not exist", async () => {
    const updatedAutomationData = {
      name: "Updated Automation",
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      time: "13:00",
      disabled: false,
      devices: [
        {
          id: 1,
        },
      ],
      action: "Turn Off",
    };

    const response = await request(app)
      .put(`/api/v1/automations/timer/9999`)
      .send(updatedAutomationData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
}, 10000);

describe("DELETE /api/v1/automations/timer/:id", () => {
  it("should delete the automation with the given id", async () => {
    const newAutomation = await TimeAutomation.create({
      name: "Test Automation 5",
      weekdays: 127,
      time: "12:00",
      disabled: true,
      system_id: 1,
      action: "Turn On",
    });

    const response = await request(app)
      .delete(`/api/v1/automations/timer/${newAutomation.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", newAutomation.id);
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "12:00");
    expect(response.body).toHaveProperty("disabled", true);
    expect(response.body).toHaveProperty("name", "Test Automation 5");

    const deletedAutomation = await TimeAutomation.findOne({
      where: {
        id: newAutomation.id,
      },
    });
    expect(deletedAutomation).toBeNull();
  });

  it("should return 404 if automation with given id does not exist", async () => {
    const response = await request(app)
      .delete(`/api/v1/automations/timer/9999`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
}, 10000);
