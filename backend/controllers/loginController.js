const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel.js");
const Setting = require("../models/settingModel.js");
const Language = require("../models/languageModel.js");
const System = require("../models/systemModel.js");

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Setting,
        as: "setting",
        attributes: ["using_darkmode"],
        include: [
          {
            model: Language,
            as: "language",
            attributes: ["code"],
          },
        ],
      },
    ],
  });

  if (user?.is_registered && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "168h",
      }
    );
    res.status(200).json({
      message: "Logged in.",
      token,
      using_darkmode: user.setting.using_darkmode,
      language: user.setting.language.code,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password." });
  }
};

const logout = (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            res.status(401).json({ message: "Invalid token" });
          } else {
            res.status(200).json({ message: "Logged out successfully" });
          }
        });
      } catch (error) {
        res.status(500).json({ message: "Error logging out" });
      }
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    res.status(400).json({
      message:
        "Email not found. Please ask your admin to add you to the users.",
    });
    return;
  }

  if (existingUser?.password) {
    res.status(400).json({ message: "This user has already been registered." });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  existingUser.name = name;
  existingUser.password = hashedPassword;
  existingUser.is_registered = 1;

  const updatedUser = await existingUser.save();

  if (updatedUser) {
    res.status(201).json({ message: "User created." });
  } else {
    res.status(500).json({ message: "Error creating user." });
  }
};

const createSystem = async (req, res) => {
  const { name, email, password, timeZone } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    res.status(400).json({ message: "This user has already been registered." });
    return;
  }

  const system = await System.create({ time_zone: timeZone });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    system_id: system.id,
    role: "owner",
    is_registered: 1,
  });

  if (system && user) {
    res.status(201).json({ message: "System created." });
  } else {
    res.status(500).json({ message: "Error creating system." });
  }
};

module.exports = { login, logout, register, createSystem };
