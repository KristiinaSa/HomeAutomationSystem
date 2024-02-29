const User = require("../models/userModel.js");

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
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};

const inviteUser = async (req, res) => {
  const { email } = req.body.email;
  try {
    const user = await User.create({ email });
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
    const user = await User.findOne({ where: { id } });
    await user.update({ role });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

module.exports = { deleteUser, getAllUsers, inviteUser, changeRole };
