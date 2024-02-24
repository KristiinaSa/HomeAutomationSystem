export function weekdaysToBitmask(weekdays) {
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

  return bitmask.toString(2).padStart(days.length, "0");
}

export function bitmaskToWeekdays(bitmask) {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  let weekdays = {};

  bitmask = parseInt(bitmask, 2);

  for (let i = days.length - 1; i >= 0; i--) {
    weekdays[days[i]] = (bitmask & 1) === 1;
    bitmask >>= 1;
  }

  return weekdays;
}
