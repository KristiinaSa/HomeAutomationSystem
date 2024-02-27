import "./db/associations.js";

import User from "./models/userModel.js";

const user = await User.findByPk(1); // Find the user with id 1
const setting = await user.getSetting(); // Get the setting associated with the user

console.log(setting);
