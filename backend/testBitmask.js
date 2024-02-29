const helpers = require("./controllers/helpers.js");

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
console.log(bitmaskToWeekdays(parseInt("1000001", 2)));
