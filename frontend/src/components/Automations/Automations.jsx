import { useState, useEffect } from "react";
import { dummyAutomations } from "../../dummyData/dummyAutomations";
import { AutomationCard } from "./AutomationCard";

export const Automations = () => {
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAutomations(dummyAutomations);
    }, 1000);
  }, []);

  return (
    <div>
      {automations.map((automation) => (
        <AutomationCard key={automation.id} automation={automation} />
      ))}
    </div>
  );
};
