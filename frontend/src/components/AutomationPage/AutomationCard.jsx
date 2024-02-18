export const AutomationCard = ({ automation }) => {
  const numDevices = automation.devices ? automation.devices.length : 0;

  const dayAbbreviations = {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
  };

  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const allDays = [...weekdays, "saturday", "sunday"];

  let activeDays =
    automation.weekdays && automation.weekdays.length > 0
      ? Object.entries(automation.weekdays[0])
          .filter(([day, isActive]) => isActive)
          .map(([day]) => day)
      : [];

  if (
    activeDays.length === allDays.length &&
    activeDays.every((day) => allDays.includes(day))
  ) {
    activeDays = ["Everyday"];
  } else if (
    activeDays.length === weekdays.length &&
    activeDays.every((day) => weekdays.includes(day))
  ) {
    activeDays = ["Weekdays"];
  } else {
    activeDays = activeDays.map((day) => dayAbbreviations[day]);
  }

  return (
    <div key={automation.id}>
      <h2>{automation.name}</h2>
      <p>{numDevices} accessories</p>
      <p>{automation.time}</p>
      <p>{activeDays.join(", ")}</p>
    </div>
  );
};
