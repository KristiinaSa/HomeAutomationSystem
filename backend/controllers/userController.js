const User = require("../models/userModel.js");
const System = require("../models/systemModel.js");

const sendEmail = require("../services/sendEmail.js");

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("Destroy id:", id);
  try {
    const user = await User.destroy({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const systemId = req.user.system_id;
    const users = await User.findAll({ where: { system_id: systemId } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};

const inviteUser = async (req, res) => {
  const email = req.body.email;
  const system = await System.findOne({ where: { id: req.user.system_id } });
  const systemName = system.name;
  const admin = req.user.name;
  try {
    const user = await User.create({ email, system_id: system.id });
    const inviteLink = `http://localhost:5173/register?invite=${email}`;
    sendEmail(
      email,
      "You're invited!",
      ["inviteUser", "inviteUserFinnish", "inviteUserJapanese"],
      {
        name: "User",
        link: inviteLink,
        systemName,
        admin,
      }
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error inviting user" });
    console.log("error", error);
  }
};

const changeRole = async (req, res) => {
  console.log("in changeRole");
  const { id } = req.params;
  const { role } = req.body;
  try {
    const targetUserData = await User.findOne({ where: { id } });
    if (targetUserData && targetUserData.role === "owner") {
      return res.status(403).json({ message: "Cannot modify the owner!" });
    }
    if (!targetUserData) {
      return res.status(404).json({ error: "User not found" });
    }
    await targetUserData.update({ role });
    res.status(200).json(targetUserData);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

const themeToggler = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const settings = await user.getSetting();
    const newTheme = !settings.using_darkmode;
    await settings.update({ using_darkmode: newTheme });
    res.status(200).json({ using_darkmode: newTheme });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error updating theme" });
  }
};

const changeLanguage = async (req, res) => {
  console.log("in changeLanguage");
  console.log("req.body", req.body);
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const settings = await user.getSetting();
    await settings.update({ language_id: req.body.id });
    res.status(200).json({ language_id: req.body.id });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error updating language" });
  }
};

module.exports = {
  deleteUser,
  getAllUsers,
  inviteUser,
  changeRole,
  themeToggler,
  changeLanguage,
};
