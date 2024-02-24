export function weekdaysToBitmask(weekdays) {
  const days = [
    "sunday",
    "saturday",
    "friday",
    "thursday",
    "wednesday",
    "tuesday",
    "monday",
  ];
  let bitmask = 0;

  for (let day of days) {
    bitmask <<= 1;
    bitmask |= weekdays[day] ? 1 : 0;
  }

  return bitmask;
}

export function bitmaskToWeekdays(bitmask) {
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
