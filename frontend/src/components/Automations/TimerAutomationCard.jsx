import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faArrowRight,
  faLightbulb,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import styles from "./Automations.module.css";

export const TimerAutomationCard = ({ automation }) => {
  const navigate = useNavigate();
  const numDevices = automation.devices ? automation.devices.length : 0;
  const { t } = useTranslation();

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
  const weekends = ["saturday", "sunday"];
  const allDays = [...weekdays, ...weekends];

  const activeDays = getActiveDays(automation, weekdays, weekends, allDays, t);

  const handleEdit = () => {
    navigate(`/automations/edit/${automation.id}`, {
      state: { automationType: "timer" },
    });
  };

  return (
    <div data-testid="automation-card" className={styles.automationCard}>
      <div className={styles.leftside}>
        <h3 data-testid="automation-name">{automation.name}</h3>
        <div className={styles.automationIcons}>
          <FontAwesomeIcon icon={faClock} size="2xl" />
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
          <FontAwesomeIcon
            icon={faLightbulb}
            size="2xl"
            className={automation.action === "Turn On" ? "icon-on" : "icon-off"}
          />
        </div>
        <div className={styles.automationDate}>
          <p data-testid="automation-time">{automation.time}</p>
          <p data-testid="automation-active-days">{activeDays.join(", ")}</p>
        </div>
      </div>
      <div className={styles.info}>
        <p data-testid="automation-status">
          {automation.disabled
            ? t("Disabled")
            : `${numDevices} ${t("accessories")}`}
        </p>
        <a
          onClick={handleEdit}
          aria-label="Edit"
          className={styles["edit-button"]}
          data-testid="edit-button"
        >
          <FontAwesomeIcon icon={faChevronRight} size="xl" />
        </a>
      </div>
    </div>
  );
};

const getActiveDays = (automation, weekdays, weekends, allDays, t) => {
  let activeDays = automation.weekdays
    ? Object.entries(automation.weekdays).reduce(
        (activeDays, [day, isActive]) => {
          if (isActive) {
            activeDays.push(day);
          }
          return activeDays;
        },
        []
      )
    : [];

  if (
    activeDays.length === allDays.length &&
    activeDays.every((day) => allDays.includes(day))
  ) {
    activeDays = [t("everyday")];
  } else if (
    activeDays.length === weekdays.length &&
    activeDays.every((day) => weekdays.includes(day))
  ) {
    activeDays = [t("weekdays")];
  } else if (
    activeDays.length === weekends.length &&
    activeDays.every((day) => weekends.includes(day))
  ) {
    activeDays = [t("weekend")];
  } else {
    activeDays = activeDays.map((day) =>
      t(day.charAt(0).toUpperCase() + day.slice(1))
    );
  }

  return activeDays;
};
