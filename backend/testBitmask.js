import { weekdaysToBitmask, bitmaskToWeekdays } from "./controllers/helpers.js";

const weekdays = {
  monday: true,
  tuesday: true,
  wednesday: false,
  thursday: true,
  friday: true,
  saturday: false,
  sunday: false,
};

console.log(weekdaysToBitmask(weekdays)); // 62
console.log(bitmaskToWeekdays("1101100"));
