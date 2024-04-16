import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import DeviceSelection from "./DeviceSelection";
import { DisableCheckbox } from "./DisableCheckbox";

import { useLanguage } from "../../context/LanguageContext";

import { DeviceContext } from "../../context/DeviceContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ActionType from "./ActionType";

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

  const { devices } = useContext(DeviceContext);
  const [automationDevices, setAutomationDevices] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [actionType, setActionType] = useState("");
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (automation) {
      setName(automation.name);
      setTime(automation.time);
      setSelectedDays(automation.weekdays);
      setAutomationDevices(automation.devices);
      setIsDisabled(automation.disabled);
      setActionType(automation.action);
    }
  }, [automation]);

  useEffect(() => {
    setAvailableDevices(
      devices.filter(
        (device) => !automationDevices.find((d) => d.id === device.id)
      )
    );
  }, [devices, automationDevices]);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      weekdays: selectedDays,
      time,
      devices: automationDevices,
      disabled: isDisabled,
      type: automation ? automation.type : "timer",
      action: actionType,
    };
    console.log(data);
    handleSubmit(data, automation?.id);
  };

  const isButtonDisabled = () => {
    const noDaysSelected = !Object.values(selectedDays).some(Boolean);
    const noDevicesSelected = automationDevices.length === 0;

    return !time || noDaysSelected || noDevicesSelected || !name || !actionType;
  };

  return (
    <form
      data-testid="timer-automation-form"
      onSubmit={onSubmit}
      className={styles.verticalLayout}
    >
      <p>{t("name")}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        data-testid="name-input"
      />
      <p>{t("time")}</p>
      <TimeSelection time={time} setTime={setTime} data-testid="time-input" />
      <DaySelection
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <DeviceSelection
        devices={availableDevices}
        selectedDevices={automationDevices}
        setSelectedDevices={setAutomationDevices}
      />
      <DisableCheckbox
        automation={automation}
        isDisabled={isDisabled}
        handleCheckboxChange={(event) => setIsDisabled(event.target.checked)}
      />
      <ActionType
        action={actionType}
        setAction={setActionType}
        data-testid="action-type"
      />
      <div className={styles.buttonsArea}>
        <button
          type="submit"
          disabled={isButtonDisabled()}
          className={isButtonDisabled() ? styles.disabledButton : "primary-btn"}
          data-testid="submit-button"
        >
          {automation ? t("update automation") : t("create new automation")}
        </button>
        {automation && (
          <button
            className="secondary-btn"
            onClick={() => handleDelete(automation.id)}
            aria-label="Delete"
            style={{ cursor: "pointer" }}
            data-testid="delete-button"
          >
            <FontAwesomeIcon icon={faTrash} />
            {t("delete")}
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="secondary-btn"
          data-testid="cancel-button"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
};

export default TimerAutomationForm;
