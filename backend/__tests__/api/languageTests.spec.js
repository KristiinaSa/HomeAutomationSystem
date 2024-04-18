const request = require("supertest");
const app = require("../../app.js");
const getSequelize = require("../../db/db.js");
const sequelize = getSequelize();
require("../../db/associations.js");

const System = require("../../models/systemModel.js");

const populateTables = require("../../db/populateTables.js");

const bcrypt = require("bcryptjs");

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
  await populateTables();

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

describe("getLanguages", () => {
  it("should return 200 and a list of languages", async () => {
    const res = await request(app)
      .get("/api/v1/languages")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("getTranslations", () => {
  it("should return 200 and a list of translations for a given language", async () => {
    const res = await request(app)
      .get("/api/v1/languages/translations?lng=en")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe("object");
  });

  it("should return 400 and an error message when the language is not supported", async () => {
    const res = await request(app)
      .get("/api/v1/languages/translations?lng=unsupported")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
  });
});
