import automationModel from "../dummyModels/automationModel.js";

const checkAutomations = () => {
  const now = new Date();

  const currentDay = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(now)
    .toLowerCase();
  const currentHours = now.getHours().toString().padStart(2, "0");
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHours}:${currentMinutes}`;

  console.log(`Checking automations on a ${currentDay} at ${currentTime}`);

  automationModel.forEach((automation) => {
    if (automation.automationType === "timer" && !automation.isDisabled) {
      if (automation.time === currentTime && automation.weekdays[currentDay]) {
        console.log(`Running automation: ${automation.name}`);
      }
    }
  });
};

export default checkAutomations;
