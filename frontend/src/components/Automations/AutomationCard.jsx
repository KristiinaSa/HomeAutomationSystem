import { useNavigate } from "react-router-dom";

export const AutomationCard = ({ automation }) => {
  const navigate = useNavigate();
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

  let activeDays = automation.weekdays
    ? Object.entries(automation.weekdays)
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

  const handleEdit = () => {
    navigate(`/automations/edit/${automation.id}`);
  };

  return (
    <div key={automation.id}>
      <h2>{automation.name}</h2>
      <p>{numDevices} accessories</p>
      <p>{automation.time}</p>
      <p>{activeDays.join(", ")}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};