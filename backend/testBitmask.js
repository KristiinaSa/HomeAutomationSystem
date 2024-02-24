import { weekdaysToBitmask, bitmaskToWeekdays } from "./controllers/helpers.js";

const weekdays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: true,
  sunday: true,
};

console.log(weekdaysToBitmask(weekdays)); // 62
console.log(bitmaskToWeekdays("1101100"));
