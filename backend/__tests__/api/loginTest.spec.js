const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginController = require("../../controllers/loginController");
const User = require("../../models/userModel");

jest.mock("jsonwebtoken");
jest.mock("../../models/userModel");
jest.mock("../../models/settingModel");

const app = express();
app.use(express.json());
app.post("/login", loginController.login);

jwt.sign = jest.fn();
jwt.verify = jest.fn();

User.findOne = jest.fn();

describe("loginController", () => {
  describe("login", () => {
    it("should return 200 and a token when the user is authenticated", async () => {
      const mockUser = {
        id: 1,
        name: "Test User",
        password: bcrypt.hashSync("password", 10),
        setting: {
          using_darkmode: false,
        },
      };

      User.findOne.mockImplementation(() => Promise.resolve(mockUser));
      jwt.sign.mockReturnValue("token");

      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("using_darkmode");
    });

    it("should return 401 when the user is not authenticated", async () => {
      User.findOne.mockImplementation(() => Promise.resolve(null));

      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password" });

      expect(res.statusCode).toEqual(401);
    });
  });
});
