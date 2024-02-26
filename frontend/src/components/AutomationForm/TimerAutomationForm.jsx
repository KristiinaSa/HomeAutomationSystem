import { useEffect, useState } from "react";

import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import DeviceSelection from "./DeviceSelection";
import { DisableCheckbox } from "./DisableCheckbox";

import { dummyDevices } from "../../dummyData/dummyDevices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./CreateAutomation.module.css";

const TimerAutomationForm = ({ handleSubmit, automation, handleDelete }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (automation) {
      setName(automation.name);
      setTime(automation.time);
      setSelectedDays(automation.weekdays);
      setDevices(automation.devices);
      setIsDisabled(automation.isDisabled);
    }
  }, [automation]);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      weekdays: selectedDays,
      time,
      devices,
      isDisabled,
      type: automation ? automation.type : "timer",
    };
    console.log(data);
    handleSubmit(data, automation?.id);
  };

  const isButtonDisabled = () => {
    const noDaysSelected = !Object.values(selectedDays).some(Boolean);
    const noDevicesSelected = devices.length === 0;
    return !time || noDaysSelected || noDevicesSelected || !name;
  };

  return (
    <div className={styles.verticalLayout}>
      <p>Name</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Time</p>
      <TimeSelection time={time} setTime={setTime} />
      <DaySelection
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <DeviceSelection
        devices={dummyDevices}
        selectedDevices={devices}
        setSelectedDevices={setDevices}
      />
      <DisableCheckbox
        automation={automation}
        isDisabled={isDisabled}
        handleCheckboxChange={(event) => setIsDisabled(event.target.checked)}
      />
      <button
        onClick={onSubmit}
        disabled={isButtonDisabled()}
        style={
          isButtonDisabled() ? styles.disabledButtonStyles : styles.buttonStyles
        }
      >
        {automation ? "Update Automation" : "Create New Automation"}
      </button>
      {automation && (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleDelete(automation.id)}
          role="button"
          aria-label="Delete"
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default TimerAutomationForm;
