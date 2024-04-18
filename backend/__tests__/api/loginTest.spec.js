const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../../app.js");
const System = require("../../models/systemModel");
const Language = require("../../models/languageModel");
const getSequelize = require("../../db/db.js");
const sequelize = getSequelize();

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

async function createLanguage() {
  return await Language.create({
    code: "en",
    name: "English",
  });
}

beforeEach(async () => {
  await sequelize.sync({ force: true });

  system = await System.create({
    name: "Test System",
  });

  await createLanguage();
  await createUser(system);

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

describe("loginController", () => {
  describe("login", () => {
    it("should return 200 and a token when the user is authenticated", async () => {
      const res = await request(app)
        .post("/api/v1/login")
        .send({ email: "test@test.test", password: "password" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should return 401 when the user is not authenticated", async () => {
      const res = await request(app)
        .post("/api/v1/login")
        .send({ email: "wrong@test.test", password: "password" });

      expect(res.statusCode).toEqual(401);
    });
  });
});

describe("logout", () => {
  it("should return 200 and a success message when the token is valid", async () => {
    const res = await request(app)
      .post("/api/v1/login/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
  });

  it("should return 401 and an error message when no token is provided", async () => {
    const res = await request(app).post("/api/v1/login/logout");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "No token provided");
  });

  it("should return 401 and an error message when the token is invalid", async () => {
    const res = await request(app)
      .post("/api/v1/login/logout")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });
});
