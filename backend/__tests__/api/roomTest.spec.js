const request = require("supertest");
const app = require("../../app.js");

const getSequelize = require("../../db/db.js");
const sequelize = getSequelize();
require("../../db/associations.js");

const System = require("../../models/systemModel.js");

const bcrypt = require("bcryptjs");

const Language = require("../../models/languageModel.js");

let token;
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

beforeEach(async () => {
  await sequelize.sync({ force: true });

  await Language.create({ code: "en", name: "English" });

  system = await System.create({
    name: "Test System",
  });

  const user = await createUser(system);

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

describe("getAllRooms", () => {
  it("should return all rooms for the logged in user", async () => {
    const response = await request(app)
      .get("/api/v1/rooms")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("createRoom", () => {
  it("should create a new room", async () => {
    const response = await request(app)
      .post("/api/v1/rooms")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Room" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Room");
  });
});
