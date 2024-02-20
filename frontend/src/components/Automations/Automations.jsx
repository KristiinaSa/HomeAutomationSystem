import { useState, useEffect } from "react";
import { dummyAutomations } from "../../dummyData/dummyAutomations";
import { TimerAutomationCard } from "./TimerAutomationCard";
import { SensorAutomationCard } from "./SensorAutomationCard";
import { Link } from "react-router-dom";

import DarkLightToggle from "../DarkLightToggle";

export const Automations = () => {
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAutomations(dummyAutomations);
    }, 1000);
  }, []);

  return (
    <div>
      <DarkLightToggle />
      {automations.map((automation) =>
        automation.automationType === "timer" ? (
          <TimerAutomationCard key={automation.id} automation={automation} />
        ) : (
          <SensorAutomationCard key={automation.id} automation={automation} />
        )
      )}
      <Link to="/automations/new">
        <button>Create New Automation</button>
      </Link>
    </div>
  );
};
