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

  for (let i = 0; i < days.length; i++) {
    if (weekdays[days[i]]) {
      bitmask |= 1 << i;
    }
  }

  return bitmask;
}

function bitmaskToWeekdays(bitmask) {
  return {
    monday: !!(bitmask & 0b0000001),
    tuesday: !!(bitmask & 0b0000010),
    wednesday: !!(bitmask & 0b0000100),
    thursday: !!(bitmask & 0b0001000),
    friday: !!(bitmask & 0b0010000),
    saturday: !!(bitmask & 0b0100000),
    sunday: !!(bitmask & 0b1000000),
  };
}

const TYPE_TO_DATA_TYPE = {
  light: "boolean",
  tv: "boolean",
  fan: "boolean",
};

const ACTION_TO_STRING = {
  on: "Turn On",
  off: "Turn Off",
};

const STRING_TO_ACTION = {
  "turn on": "on",
  "turn off": "off",
};

module.exports = {
  weekdaysToBitmask,
  bitmaskToWeekdays,
  TYPE_TO_DATA_TYPE,
  ACTION_TO_STRING,
  STRING_TO_ACTION,
};
