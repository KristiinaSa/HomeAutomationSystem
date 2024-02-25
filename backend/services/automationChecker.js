import Sequelize from "sequelize";
import TimeAutomation from "../models/timeAutomationModel.js";
import { Op } from "sequelize";

const checkAutomations = async () => {
  const now = new Date();

  const currentDayIndex = now.getDay() || 7;
  const currentDayBit = 1 << (currentDayIndex - 1);
  const currentHours = now.getHours().toString().padStart(2, "0");
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHours}:${currentMinutes}`;

  console.log(`Checking automations on a ${currentDayIndex} at ${currentTime}`);

  const automations = await TimeAutomation.findAll({
    where: {
      time: currentTime,
      active: true,
      [Op.and]: [Sequelize.literal(`weekdays & ${currentDayBit} != 0`)],
    },
  });

  console.log(automations);

  automations.forEach((automation) => {
    console.log(`Running automation: ${automation.name}`);
  });
};

export default checkAutomations;
