import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { loginDummyData } from "../dummyData/loginDummyData.js";

dotenv.config();

export const login = (req, res) => {
  const { email, password } = req.body;

  if (
    email === loginDummyData.email &&
    bcrypt.compareSync(password, loginDummyData.password)
  ) {
    const token = jwt.sign(
      { email: loginDummyData.email, name: loginDummyData.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );
    res.status(200).json({ message: "Logged in.", token });
  } else {
    res.status(401).json({ message: "Invalid email or password." });
  }
};

export const logout = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          // TO DO: Add token to blacklist or revocation list here
          res.status(200).json({ message: "Logged out successfully" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error logging out" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
