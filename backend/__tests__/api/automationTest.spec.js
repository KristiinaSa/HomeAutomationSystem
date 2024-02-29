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

describe("GET /api/v1/automations/:id", () => {
  it("should return the automation with the given id", async () => {
    const newAutomation = await TimeAutomation.create({
      name: "Test Automation 2",
      weekdays: 127,
      time: "12:00",
      active: true,
      devices: [
        {
          name: "Test Device",
          type: "Light",
          model: "BOB-LED",
          value: "on",
          data_type: "boolean",
          role_access: "resident",
        },
      ],
      system_id: 1,
    });

    const response = await request(app).get(
      `/api/v1/automations/timer/${newAutomation.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", newAutomation.id);
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "12:00");
    expect(response.body).toHaveProperty("active", true);
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
      active: true,
      system_id: 1,
      devices: [
        {
          id: 1,
        },
      ],
    };

    const response = await request(app)
      .post("/api/v1/automations/timer")
      .send(newAutomationData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "12:00");
    expect(response.body).toHaveProperty("active", true);
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
    };

    const response = await request(app)
      .post("/api/v1/automations/timer")
      .send(newAutomationData);

    expect(response.status).toBe(400);
  });
}, 10000);

describe("PUT /api/v1/automations/timer/:id", () => {
  it("should update the automation with the given id", async () => {
    const newAutomation = await TimeAutomation.create({
      name: "Test Automation 4",
      weekdays: 127,
      time: "12:00",
      active: true,
      system_id: 1,
    });

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
      active: false,
      devices: [
        {
          id: 1,
        },
      ],
    };

    const response = await request(app)
      .put(`/api/v1/automations/timer/${newAutomation.id}`)
      .send(updatedAutomationData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", newAutomation.id);
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "13:00");
    expect(response.body).toHaveProperty("active", false);
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
      active: false,
      devices: [
        {
          id: 1,
        },
      ],
    };

    const response = await request(app)
      .put(`/api/v1/automations/timer/9999`)
      .send(updatedAutomationData);

    expect(response.status).toBe(404);
  });
}, 10000);

describe("DELETE /api/v1/automations/timer/:id", () => {
  it("should delete the automation with the given id", async () => {
    const newAutomation = await TimeAutomation.create({
      name: "Test Automation 5",
      weekdays: 127,
      time: "12:00",
      active: true,
      system_id: 1,
    });

    const response = await request(app).delete(
      `/api/v1/automations/timer/${newAutomation.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", newAutomation.id);
    expect(response.body).toHaveProperty("weekdays");
    expect(response.body).toHaveProperty("time", "12:00");
    expect(response.body).toHaveProperty("active", true);
    expect(response.body).toHaveProperty("name", "Test Automation 5");

    const deletedAutomation = await TimeAutomation.findOne({
      where: {
        id: newAutomation.id,
      },
    });
    expect(deletedAutomation).toBeNull();
  });

  it("should return 404 if automation with given id does not exist", async () => {
    const response = await request(app).delete(
      `/api/v1/automations/timer/9999`
    );

    expect(response.status).toBe(404);
  });
}, 10000);
