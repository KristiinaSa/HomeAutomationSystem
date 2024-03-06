function weekdaysToBitmask(weekdays) {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  let bitmask = 0;

  for (let day of days) {
    bitmask <<= 1;
    bitmask |= weekdays[day] ? 1 : 0;
  }

  return bitmask;
}

function bitmaskToWeekdays(bitmask) {
  return {
    monday: !!(bitmask & 0b1000000),
    tuesday: !!(bitmask & 0b0100000),
    wednesday: !!(bitmask & 0b0010000),
    thursday: !!(bitmask & 0b0001000),
    friday: !!(bitmask & 0b0000100),
    saturday: !!(bitmask & 0b0000010),
    sunday: !!(bitmask & 0b0000001),
  };
}

const TYPE_TO_DATA_TYPE = {
  light: "boolean",
};

module.exports = { weekdaysToBitmask, bitmaskToWeekdays, TYPE_TO_DATA_TYPE };
