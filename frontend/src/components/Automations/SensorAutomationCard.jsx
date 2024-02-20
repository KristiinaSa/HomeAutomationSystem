import { useNavigate } from "react-router-dom";

export const SensorAutomationCard = ({ automation }) => {
  const navigate = useNavigate();
  const numDevices = automation.devices ? automation.devices.length : 0;
  console.log(automation.sensor);

  const handleEdit = () => {
    navigate(`/automations/edit/${automation.id}`);
  };

  return (
    <div key={automation.id}>
      <h2>{automation.name}</h2>
      <p>{automation.sensor.name} sensor</p>
      <p>{numDevices} devices</p>
      <p>Time: {automation.time}</p>
      <p>Disabled: {automation.isDisabled ? "Yes" : "No"}</p>
      <p>Action: {automation.actionType}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};
