const request = require("supertest");
const app = require("../../app.js");

const getSequelize = require("../../db/db.js");
const sequelize = getSequelize();
require("../../db/associations.js");

const System = require("../../models/systemModel.js");

const User = require("../../models/userModel.js");

const bcrypt = require("bcryptjs");

const Language = require("../../models/languageModel.js");

let token;
let system;

async function createUser(system, email) {
  return await User.create({
    name: "Test User",
    role: "owner",
    password: bcrypt.hashSync("password", 10),
    email: email,
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

  const email = "testuser@example.com";
  const user = await createUser(system, email);

  const response = await request(app)
    .post("/api/v1/login")
    .send({ email: email, password: "password" });

  token = response.body.token;
  expect(token).toBeDefined();
  expect(typeof token).toBe("string");
});

afterAll(async () => {
  await sequelize.close();
});

describe("getAllUsers", () => {
  it("should return all users for the logged in user", async () => {
    const response = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("inviteUser", () => {
  it("should invite a user to the system", async () => {
    const response = await request(app)
      .post("/api/v1/users/invite-user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "anothertestuser@example.com",
        system_id: system.id,
      });
    expect(response.status).toBe(201);
    expect(response.body.email).toBe("anothertestuser@example.com");
    expect(response.body.system_id).toBe(system.id);
  });
});

describe("deleteUser", () => {
  it("should delete a user", async () => {
    const user = await createUser(system, "deleteuser@example.com");

    const response = await request(app)
      .delete(`/api/v1/users/delete-user/${user.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully");
  });
});

describe("changeRole", () => {
  it("should change the role of a user", async () => {
    const user = await createUser(system, "changerole@example.com");

    const response = await request(app)
      .patch(`/api/v1/users/change-role/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ role: "admin" });

    expect(response.status).toBe(200);
    expect(response.body.role).toBe("admin");
  });
});

describe("themeToggler", () => {
  it("should change the theme of a user", async () => {
    const response = await request(app)
      .post("/api/v1/users/theme")
      .set("Authorization", `Bearer ${token}`)
      .send({ theme: "dark" });

    expect(response.status).toBe(200);
    expect(response.body.using_darkmode).toBe(true);
  });
});

describe("changeLanguage", () => {
  it("should change the language of a user", async () => {
    const response = await request(app)
      .patch("/api/v1/users/language")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: 1 });

    expect(response.status).toBe(200);
    expect(response.body.language_id).toBe(1);
  });
});
